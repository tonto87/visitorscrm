import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notificationApi";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNotifications = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (error) {
        setError("Failed to fetch notifications.");
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    getNotifications();
  }, []);

  const handleMarkAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  return {
    notifications,
    loading,
    error,
    handleMarkAsRead,
  };
};

export default useNotifications;
