import api from "./api";

export const getDashboardStats = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id, userData) => {
  try {
    console.log("Updating user ID:", id, userData);
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {

    console.error("Update User Error Details:", error.response?.data || error.message);
    throw error;
  }
};