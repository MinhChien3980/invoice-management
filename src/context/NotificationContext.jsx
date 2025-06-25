import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { AuthContext } from './AuthContext';
import axios from 'axios';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const [connected, setConnected] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const { user, isAuthenticated } = useContext(AuthContext);
    const stompClientRef = useRef(null);
    const subscriptionsRef = useRef([]);

    // Connect to WebSocket when authenticated
    useEffect(() => {
        console.log("Auth state changed:", isAuthenticated(), user);
        // Kết nối khi đã đăng nhập
        if (isAuthenticated() && user) {
            console.log("Attempting to connect WebSocket as user:", user.username);
            connectWebSocket();
        }
        
        // Cleanup khi component unmount
        return () => {
            console.log("Cleaning up WebSocket connection");
            disconnectWebSocket();
        };
    }, [isAuthenticated, user]);

    // Fetch initial notifications
    useEffect(() => {
        if (isAuthenticated() && user) {
            console.log("Fetching initial notifications for user:", user.username);
            fetchNotifications();
        }
    }, [isAuthenticated, user]);

    // Cập nhật số lượng thông báo chưa đọc mỗi khi danh sách thông báo thay đổi
    useEffect(() => {
        if (notifications.length > 0) {
            const unread = notifications.filter(n => !n.read).length;
            console.log('Recalculating unread count:', unread);
            setUnreadCount(unread);
        }
    }, [notifications]);

    const disconnectWebSocket = () => {
        try {
            // Hủy đăng ký các subscription
            if (subscriptionsRef.current) {
                subscriptionsRef.current.forEach(subscription => {
                    if (subscription && subscription.unsubscribe) {
                        subscription.unsubscribe();
                    }
                });
                subscriptionsRef.current = [];
            }
            
            // Ngắt kết nối client
            if (stompClientRef.current && stompClientRef.current.connected) {
                stompClientRef.current.disconnect();
                console.log('WebSocket disconnected');
            }
            
            setConnected(false);
        } catch (error) {
            console.error('Error disconnecting WebSocket:', error);
        }
    };

    const connectWebSocket = () => {
        try {
            // Ngắt kết nối cũ nếu có
            disconnectWebSocket();
            
            console.log("Creating new WebSocket connection");
            // Tạo kết nối SockJS không sử dụng withCredentials
            const socket = new SockJS('http://localhost:8080/ws');
            const client = Stomp.over(socket);
            
            // Disable debug logging
            client.debug = msg => {
                console.log("STOMP debug:", msg);
            };
            
            // Không cần gửi kèm credentials
            const headers = {};
            
            console.log("Attempting to connect to WebSocket server");
            client.connect(headers, frame => {
                console.log('Connected to WebSocket server:', frame);
                setConnected(true);
                stompClientRef.current = client;
                
                // Đăng ký nhận thông báo từ topic chung
                console.log("Subscribing to /topic/notifications");
                const subscription = client.subscribe('/topic/notifications', message => {
                    try {
                        console.log('Received notification message:', message);
                        const notification = JSON.parse(message.body);
                        console.log('Parsed notification:', notification);
                        handleNewNotification(notification);
                    } catch (error) {
                        console.error('Error handling notification message:', error);
                    }
                });
                
                // Lưu subscription để cleanup sau này
                subscriptionsRef.current.push(subscription);
                console.log("Successfully subscribed to notifications");
                
            }, error => {
                console.error('STOMP connection error:', error);
                setTimeout(() => {
                    console.log("Retrying WebSocket connection after error");
                    connectWebSocket();
                }, 5000); // Retry after 5 sec
            });
            
            setStompClient(client);
        } catch (error) {
            console.error('Error in WebSocket setup:', error);
        }
    };

    const handleNewNotification = (notification) => {
        console.log('Processing new notification:', notification);
        setNotifications(prev => {
            // Kiểm tra xem thông báo đã tồn tại chưa
            const exists = prev.some(n => n.id === notification.id);
            if (exists) {
                console.log('Notification already exists, skipping:', notification.id);
                return prev;
            }
            console.log('Adding new notification to state');
            return [notification, ...prev];
        });
        
        // Không cần tăng unreadCount ở đây nữa vì đã có useEffect theo dõi
        
        // Show browser notification if supported
        if ('Notification' in window && Notification.permission === 'granted') {
            console.log('Showing browser notification');
            new Notification('Thông báo mới', {
                body: notification.message,
                icon: '/favicon.ico'
            });
        } else if ('Notification' in window && Notification.permission !== 'denied') {
            console.log('Requesting notification permission');
            Notification.requestPermission();
        }
    };

    const fetchNotifications = async () => {
        try {
            console.log('Fetching notifications from API');
            const response = await axios.get('http://localhost:8080/api/notifications');
            console.log('Fetched notifications:', response.data);
            setNotifications(response.data);
            
            // Không cần tính unreadCount ở đây nữa vì đã có useEffect theo dõi
        } catch (error) {
            console.error('Failed to fetch notifications', error);
        }
    };

    // Lấy thông báo chưa đọc
    const getUnreadNotifications = () => {
        return notifications.filter(n => !n.read);
    };

    // Lấy thông báo đã đọc
    const getReadNotifications = () => {
        return notifications.filter(n => n.read);
    };

    const markAsRead = async (id) => {
        try {
            console.log('Marking notification as read:', id);
            await axios.put(`http://localhost:8080/api/notifications/${id}/read`);
            
            // Update local state
            setNotifications(prev => 
                prev.map(n => n.id === id ? { ...n, read: true } : n)
            );
            
            // Không cần giảm unreadCount ở đây nữa vì đã có useEffect theo dõi
            console.log('Notification marked as read:', id);
        } catch (error) {
            console.error('Failed to mark notification as read', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            console.log('Marking all notifications as read');
            // This would need an endpoint on your backend
            await axios.put('http://localhost:8080/api/notifications/read-all');
            
            // Update local state
            setNotifications(prev => 
                prev.map(n => ({ ...n, read: true }))
            );
            
            // Không cần reset unreadCount ở đây nữa vì đã có useEffect theo dõi
            console.log('All notifications marked as read');
        } catch (error) {
            console.error('Failed to mark all notifications as read', error);
        }
    };

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            connected,
            markAsRead,
            markAllAsRead,
            fetchNotifications,
            getUnreadNotifications,
            getReadNotifications
        }}>
            {children}
        </NotificationContext.Provider>
    );
}; 