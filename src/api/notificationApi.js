import apiClient from "./index";

export const fetchNotifications = async () => {
  try {
    const response = await apiClient.get("/notifications");
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications", error);
    throw error;
  }
};

export const markAsRead = async (notificationId) => {
  try {
    const response = await apiClient.post(
      `/notifications/${notificationId}/read`,
    );
    return response.data;
  } catch (error) {
    console.error("Error marking notification as read", error);
    throw error;
  }
};

export const clearNotifications = async () => {
  try {
    await apiClient.delete("/notifications");
  } catch (error) {
    console.error("Error clearing notifications", error);
    throw error;
  }
};
