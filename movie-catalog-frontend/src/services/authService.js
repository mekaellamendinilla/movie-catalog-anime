import api, { setAuthToken } from "./api";

export const registerUser = async (payload) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await api.post("/auth/login", payload);
  const { token, user } = response.data;

  if (token) {
    setAuthToken(token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

export const logoutUser = () => {
  setAuthToken(null);
  localStorage.removeItem("user");
};
