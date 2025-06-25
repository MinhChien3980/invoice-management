import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ requiredRoles = [] }) => {
    const { isAuthenticated, hasRole, loading } = useContext(AuthContext);
    
    // If still loading, show nothing 
    if (loading) {
        return <div>Loading...</div>;
    }
    
    // If not authenticated, redirect to login
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    
    // If role is required but user doesn't have it
    if (requiredRoles.length > 0) {
        const hasRequiredRole = requiredRoles.some(role => hasRole(role));
        if (!hasRequiredRole) {
            return <Navigate to="/" replace />;
        }
    }
    
    return <Outlet />;
};

export default ProtectedRoute; 