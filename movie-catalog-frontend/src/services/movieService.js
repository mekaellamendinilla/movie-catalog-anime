import api from "./api";

export const getMovies = async () => {
  const response = await api.get("/movies");
  return response.data;
};

export const getMovieById = async (id) => {
  const response = await api.get(`/movies/${id}`);
  return response.data;
};

export const searchMovies = async (query) => {
  const response = await api.get("/movies/search", {
    params: { title: query },
  });
  return response.data;
};

export const filterMoviesByCategory = async (categoryId) => {
  const response = await api.get(`/movies/category/${categoryId}`);
  return response.data;
};

export const paginateMovies = async (page = 1, limit = 10) => {
  const response = await api.get("/movies/page", {
    params: { page, limit },
  });
  return response.data;
};
