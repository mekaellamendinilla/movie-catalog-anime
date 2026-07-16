import api from "./api";

export const getAdminMovies = async () => {
  const response = await api.get("/movies");
  return response.data;
};

export const searchAdminMovies = async (query) => {
  const response = await api.get("/movies/search", { params: { title: query } });
  return response.data;
};

export const createAdminMovie = async (payload, imageFile = null) => {
  if (imageFile) {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        formData.append(key, value);
      }
    });
    formData.append("image", imageFile);

    const response = await api.post("/movies", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }

  const response = await api.post("/movies", payload);
  return response.data;
};

export const updateAdminMovie = async (id, payload, imageFile = null) => {
  if (imageFile) {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        formData.append(key, value);
      }
    });
    formData.append("image", imageFile);

    const response = await api.put(`/movies/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }

  const response = await api.put(`/movies/${id}`, payload);
  return response.data;
};

export const deleteAdminMovie = async (id) => {
  const response = await api.delete(`/movies/${id}`);
  return response.data;
};

export const uploadAdminMoviePoster = async (formData) => {
  const response = await api.post("/movies", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
