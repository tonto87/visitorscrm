import React, { useState } from "react";
import { Dropdown, Badge } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import "./NotificationBell.scss";

const NotificationBell = () => {
  const [notifications] = useState([
    { id: 1, message: "New comment on your post", read: false },
    { id: 2, message: "You have a new friend request", read: false },
    { id: 3, message: "Your order has been shipped", read: true },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (id) => {
    // const updatedNotifications = notifications.map((notification) =>
    //   notification.id === id ? { ...notification, read: true } : notification,
    // );
  };

  return (
    <div className="notification-bell">
      <Dropdown className="notification-dropdown" align="end">
        <Dropdown.Toggle
          variant="link"
          id="dropdown-notifications"
          className="notification-toggle"
        >
          <FaBell size={24} />
          {unreadCount > 0 && (
            <Badge pill bg="danger" className="notification-badge">
              {unreadCount}
            </Badge>
          )}
        </Dropdown.Toggle>

        <Dropdown.Menu className="notification-menu">
          <Dropdown.ItemText>
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}.`
              : "No new notifications."}
          </Dropdown.ItemText>

          <Dropdown.Divider />
          {notifications.map((notification) => (
            <Dropdown.Item
              key={notification.id}
              onClick={() => handleNotificationClick(notification.id)}
              className={notification.read ? "read" : "unread"}
            >
              {notification.message}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default NotificationBell;
