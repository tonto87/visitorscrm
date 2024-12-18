import apiClient from "./index";

export const forgotPassword = (email) => {
  if (!email) {
    throw new Error("Email address is required for password reset.");
  }

  return apiClient
    .post("/auth/forgot", { email })
    .then((response) => response.data)
    .catch((error) => {
      throw error.response ? error.response.data : error.message;
    });
};
