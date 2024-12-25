import apiClient from "./index";

export const fetchApplications = async (queryString) => {
  const response = await apiClient.get("/applications", {
    params: queryString,
  });
  return response.data;
};

export const fetchApplication = async (id) => {
  const response = await apiClient.get(`/applications/${id}`);
  return response.data;
};

export const addApplication = async (application) => {
  const response = await apiClient.post("/applications", application);
  return response.data;
};

export const updateApplication = async (id, application) => {
  const response = await apiClient.put(`/applications/${id}`, application);
  return response.data;
};

export const deleteApplication = async (id) => {
  const response = await apiClient.delete(`/applications/${id}`);
  return response.data;
};
export const blockApplicationApi = async (id) => {
  const response = await apiClient.post(`/persona-non-gratas/${id}`);
  return response.data;
};

export const unblockApplicationApi = async (id) => {
  const response = await apiClient.delete(`/persona-non-gratas/${id}`);
  return response.data;
};

export const fetchDocumentTypes = async () => {
  const response = await apiClient.get("/applications/get/document-types");
  return response.data;
};

export const fetchApplicationComplaints = async (id) => {
  const response = await apiClient.get(`/applications/${id}/complaints`);
  return response.data;
};

export const fetchInfoByDoc = async (data) => {
  const response = await apiClient.post(`/applications/get/by-doc-number`, {
    ...data,
  });
  return response.data;
};

export const startVisit = async (id) => {
  try {
    const response = await apiClient.get(`/applications/${id}/start-visit`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const endVisit = async (id) => {
  const response = await apiClient.get(`/applications/${id}/end-visit`);
  return response.data;
};

export const fetchCitizenStatuses = async () => {
  const response = await apiClient.get("/applications/get/citizen-statuses");
  return response.data;
};