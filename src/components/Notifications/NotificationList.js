import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotifications,
  setLoading,
  setError,
  markAsRead,
} from "../../store/reducers/notificationReducer";
import { fetchNotifications } from "../../api/notificationApi";

const NotificationList = () => {
  const dispatch = useDispatch();
  const {
    data: notifications,
    loading,
    error,
  } = useSelector((state) => state.notifications);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const response = await fetchNotifications();
        dispatch(setNotifications(response.data));
      } catch (err) {
        dispatch(setError("Failed to fetch notifications"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            {notification.message} -{" "}
            {!notification.read && (
              <button
                onClick={() => dispatch(markAsRead({ id: notification.id }))}
              >
                Mark as Read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
