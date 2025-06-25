import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [roles, setRoles] = useState(JSON.parse(localStorage.getItem('roles')) || []);
    const [loading, setLoading] = useState(true);

    // Initialize axios defaults for authentication
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Fetch current user
            getCurrentUser();
        } else {
            delete axios.defaults.headers.common['Authorization'];
            setLoading(false);
        }
    }, [token]);

    const getCurrentUser = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/auth/me');
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user', error);
            logout(); // Logout if token is invalid
        } finally {
            setLoading(false);
        }
    };

    const login = (newToken, userRoles, username) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('roles', JSON.stringify(userRoles));
        localStorage.setItem('username', username);
        
        setToken(newToken);
        setRoles(userRoles);
        setUser({ username });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        localStorage.removeItem('username');
        
        setToken(null);
        setRoles([]);
        setUser(null);
        
        delete axios.defaults.headers.common['Authorization'];
    };

    const hasRole = (role) => {
        return roles.includes(role);
    };

    const isAdmin = () => {
        return roles.includes('ROLE_ADMIN');
    };

    const isAuthenticated = () => {
        return !!token;
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            roles,
            loading,
            login,
            logout,
            hasRole,
            isAdmin,
            isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    );
}; 