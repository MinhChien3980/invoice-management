import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { NotificationContext } from '../context/NotificationContext';
import './Navbar.css';

const Navbar = () => {
    const { user, isAuthenticated, isAdmin, logout } = useContext(AuthContext);
    const { notifications, unreadCount, markAsRead, markAllAsRead, fetchNotifications } = useContext(NotificationContext);
    const [showNotifications, setShowNotifications] = useState(false);
    const [localUnreadCount, setLocalUnreadCount] = useState(0);
    const [filterType, setFilterType] = useState('all'); // 'all', 'unread', 'read'
    const navigate = useNavigate();

    // Đồng bộ số lượng thông báo chưa đọc từ context
    useEffect(() => {
        setLocalUnreadCount(unreadCount);
    }, [unreadCount]);

    // Lọc thông báo dựa trên filterType
    const filteredNotifications = notifications.filter(notification => {
        if (filterType === 'all') return true;
        if (filterType === 'unread') return !notification.read;
        if (filterType === 'read') return notification.read;
        return true;
    });

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
        // Khi mở thông báo, cập nhật lại danh sách
        if (!showNotifications) {
            fetchNotifications();
        }
    };

    const handleNotificationClick = (notification) => {
        markAsRead(notification.id);
        
        // Navigate to the appropriate page based on notification type
        if (notification.invoiceId) {
            navigate(`/update/${notification.invoiceId}`);
        }
        
        setShowNotifications(false);
    };

    const handleMarkAllAsRead = (e) => {
        e.stopPropagation(); // Ngăn không cho đóng dropdown
        markAllAsRead();
    };

    const handleFilterChange = (type) => (e) => {
        e.stopPropagation(); // Ngăn không cho đóng dropdown
        setFilterType(type);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <Link to="/">Quản Lý Hóa Đơn</Link>
                </div>

                <div className="navbar-links">
                    {isAuthenticated() ? (
                        <>
                            <div className="navbar-item">
                                <Link to="/">Trang chủ</Link>
                            </div>
                            
                            {isAdmin() && (
                                <div className="navbar-item">
                                    <Link to="/create">Tạo hóa đơn</Link>
                                </div>
                            )}
                            
                            <div className="navbar-item notification-container">
                                <button className="notification-btn" onClick={toggleNotifications}>
                                    🔔
                                    {localUnreadCount > 0 && (
                                        <span className="notification-badge">{localUnreadCount}</span>
                                    )}
                                </button>
                                
                                {showNotifications && (
                                    <div className="notification-dropdown">
                                        <div className="notification-header">
                                            <h3>Thông báo</h3>
                                            {notifications.length > 0 && (
                                                <button 
                                                    className="mark-all-read-btn" 
                                                    onClick={handleMarkAllAsRead}
                                                    title="Đánh dấu tất cả đã đọc"
                                                >
                                                    ✓ Đánh dấu đã đọc
                                                </button>
                                            )}
                                        </div>
                                        
                                        <div className="notification-filter">
                                            <button 
                                                className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
                                                onClick={handleFilterChange('all')}
                                            >
                                                <span className="filter-icon">📋</span> Tất cả
                                            </button>
                                            <button 
                                                className={`filter-btn ${filterType === 'unread' ? 'active' : ''}`}
                                                onClick={handleFilterChange('unread')}
                                            >
                                                <span className="filter-icon">🔵</span> Chưa đọc
                                                {unreadCount > 0 && <span className="filter-count">{unreadCount}</span>}
                                            </button>
                                            <button 
                                                className={`filter-btn ${filterType === 'read' ? 'active' : ''}`}
                                                onClick={handleFilterChange('read')}
                                            >
                                                <span className="filter-icon">✓</span> Đã đọc
                                            </button>
                                        </div>
                                        
                                        <div className="notification-list">
                                            {filteredNotifications.length > 0 ? (
                                                filteredNotifications.map(notification => (
                                                    <div 
                                                        key={notification.id} 
                                                        className={`notification-item ${!notification.read ? 'unread' : ''}`}
                                                        onClick={() => handleNotificationClick(notification)}
                                                    >
                                                        <div className="notification-content">
                                                            <p>{notification.message}</p>
                                                            <small>
                                                                {new Date(notification.createdAt).toLocaleString()}
                                                            </small>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="no-notifications">
                                                    {filterType === 'all' 
                                                        ? 'Không có thông báo' 
                                                        : filterType === 'unread' 
                                                            ? 'Không có thông báo chưa đọc'
                                                            : 'Không có thông báo đã đọc'
                                                    }
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            <div className="navbar-item user-menu">
                                <span className="username">{user?.username}</span>
                                <button className="logout-btn" onClick={handleLogout}>
                                    Đăng xuất
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="navbar-item">
                                <Link to="/login">Đăng nhập</Link>
                            </div>
                            <div className="navbar-item">
                                <Link to="/register">Đăng ký</Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 