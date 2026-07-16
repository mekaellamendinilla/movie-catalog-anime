import api from "./api";

// Dashboard Stats
export const getDashboardStats = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};

// ==========================================
// USERS MANAGEMENT SERVICES
// ==========================================

// Kunin lahat ng users
export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// Burahin ang user base sa ID
export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

// IDAGDAG ITONG UPDATE USER SERVICE:
export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};