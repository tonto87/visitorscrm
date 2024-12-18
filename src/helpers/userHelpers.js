export const isLoggedIn = () => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  return isAuthenticated;
};

export const isUser = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return Boolean(userData && userData.role === "user");
};

export const isAdmin = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return Boolean(userData && userData.role === "admin");
};

export const isReception = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return Boolean(userData && userData.role === "reception");
};
