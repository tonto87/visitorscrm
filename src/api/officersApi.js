import apiClient from "./index";

export const fetchOfficers = async (queryParams) => {
  const response = await apiClient.get("/officers", { params: queryParams });
  return response.data;
};

export const fetchOfficer = async (id) => {
  const response = await apiClient.get(`/officers/${id}`);
  return response.data;
};

export const addOfficer = async (officer) => {
  const response = await apiClient.post("/officers", officer);
  return response.data;
};

export const updateOfficer = async (id, officer) => {
  const response = await apiClient.put(`/officers/${id}`, officer);
  return response.data;
};

export const deleteOfficer = async (id) => {
  const response = await apiClient.delete(`/officers/${id}`);
  return response.data;
};
