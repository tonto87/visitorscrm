import apiClient from "./index";

export const fetchComplaints = async () => {
  try {
    const response = await apiClient.get("/complaints");
    return response.data;
  } catch (error) {
    console.error("Error fetching complaints:", error);
    throw new Error("Unable to fetch complaints at the moment.");
  }
};

export const fetchComplaint = async (id) => {
  try {
    const response = await apiClient.get(`/complaints/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching complaint with ID ${id}:`, error);
    throw new Error("Unable to fetch the complaint at the moment.");
  }
};

export const addComplaint = async (complaint) => {
  try {
    const response = await apiClient.post("/complaints", complaint);
    return response.data;
  } catch (error) {
    console.error("Error adding complaint:", error);
    throw new Error("Unable to add complaint at the moment.");
  }
};

export const updateComplaint = async (id, complaint) => {
  try {
    const response = await apiClient.put(`/complaints/${id}`, complaint);
    return response.data;
  } catch (error) {
    console.error(`Error updating complaint with ID ${id}:`, error);
    throw new Error("Unable to update the complaint at the moment.");
  }
};

export const deleteComplaint = async (id) => {
  try {
    const response = await apiClient.delete(`/complaints/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting complaint with ID ${id}:`, error);
    throw new Error("Unable to delete the complaint at the moment.");
  }
};
