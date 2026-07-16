import api from "./api";

export const getAdminCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};

export const createAdminCategory = async (payload) => {
  const response = await api.post("/categories", payload);
  return response.data;
};

export const updateAdminCategory = async (id, payload) => {
  const response = await api.put(`/categories/${id}`, payload);
  return response.data;
};

export const deleteAdminCategory = async (id) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};
