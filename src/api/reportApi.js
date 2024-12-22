import apiClient from "./index";

export const fetchReports = async () => {
  const response = await apiClient.get("/reports/applications", {
    responseType: "blob",
  });
  return response.data;
};
