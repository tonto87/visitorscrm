import apiClient from "./index";

export const fetchVisitors = async (queryString) => {
  const response = await apiClient.get("/visitors", { params: queryString });
  return response.data;
};

export const fetchVisitor = async (id) => {
  const response = await apiClient.get(`/visitors/${id}`);
  return response.data;
};

export const addVisitor = async (visitor) => {
  const response = await apiClient.post("/visitors", visitor);
  return response.data;
};

export const updateVisitor = async (id, visitor) => {
  const response = await apiClient.put(`/visitors/${id}`, visitor);
  return response.data;
};

export const deleteVisitor = async (id) => {
  const response = await apiClient.delete(`/visitors/${id}`);
  return response.data;
};
export const blockVisitorApi = async (id) => {
  const response = await apiClient.post(`/persona-non-gratas/${id}`);
  return response.data;
};

export const unblockVisitorApi = async (id) => {
  const response = await apiClient.delete(`/persona-non-gratas/${id}`);
  return response.data;
};

export const fetchDocumentTypes = async () => {
  const response = await apiClient.get("/visitors/get/document-types");
  return response.data;
};

export const fetchVisitorComplaints = async (id) => {
  const response = await apiClient.get(`/visitors/${id}/complaints`);
  return response.data;
};

export const fetchInfoByDoc = async (data) => {
  const response = await apiClient.post(`/visitors/get/by-doc-number`, {
    ...data,
  });
  return response.data;
};

export const startVisit = async (id) => {
  try {
    const response = await apiClient.get(`/visitors/${id}/start-visit`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const endVisit = async (id) => {
  const response = await apiClient.get(`/visitors/${id}/end-visit`);
  return response.data;
};
