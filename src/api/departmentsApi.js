import apiClient from "./index";

export const fetchDepartments = async (queryParams) => {
  const response = await apiClient.get("/departments", { params: queryParams });
  return response.data;
};

export const fetchDepartment = async (id) => {
  const response = await apiClient.get(`/departments/${id}`);
  return response.data;
};

export const addDepartment = async (department) => {
  const response = await apiClient.post("/departments", department);
  return response.data;
};

export const updateDepartment = async (id, department) => {
  const response = await apiClient.put(`/departments/${id}`, department);
  return response.data;
};

export const deleteDepartment = async (id) => {
  const response = await apiClient.delete(`/departments/${id}`);
  return response.data;
};

export const fetchPersonaNonGratas = async () => {
  const response = await apiClient.get("/persona-non-gratas");
  return response.data;
};
