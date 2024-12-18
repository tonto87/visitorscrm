import {
  loginSuccess,
  loginFailure,
  logout as logoutAction,
} from "../store/reducers/authReducer";
import apiClient from "../api/index";

export const login = async (email, password, dispatch) => {
  try {
    const response = await apiClient.post("/auth/login", {
      email,
      password,
    });

    const token = response.data.token;

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          role: response.data.role,
        }),
      );
      dispatch(loginSuccess(response.data));
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    dispatch(loginFailure(error.response?.data?.message || "Login failed"));
    throw error;
  }
};

export const logout = async (dispatch) => {
  try {
    await apiClient.get(`/auth/logout`);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    dispatch(logoutAction());
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
