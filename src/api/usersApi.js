import apiClient from "./index";

export const fetchUsers = async (queryParams) => {
  const response = await apiClient.get("/users", { params: queryParams });
  return response.data;
};

export const fetchUser = async (id) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

export const addUser = async (user) => {
  const response = await apiClient.post("/users", user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await apiClient.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await apiClient.delete(`/users/${id}`);
  return response.data;
};

export const fetchRoles = async () => {
  const response = await apiClient.get("/users/roles");
  return response.data;
};
