import apiClient from "./index";

export const resetPassword = (
  email,
  token,
  password,
  password_confirmation,
) => {
  if (!email || !token || !password || !password_confirmation) {
    throw new Error("Bütün sahələr tələb olunur.");
  }

  if (password !== password_confirmation) {
    throw new Error("Parollar uyğun gəlmir.");
  }

  return apiClient
    .post("/auth/reset", { email, token, password, password_confirmation })
    .then((response) => response.data)
    .catch((error) => {
      throw error.response ? error.response.data : error.message;
    });
};
