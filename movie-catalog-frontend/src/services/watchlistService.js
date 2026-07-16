import api from "./api";

export const getWatchlist = async () => {
  const response = await api.get("/watchlist");
  return response.data;
};

export const addWatchlist = async (movieId) => {
  const response = await api.post("/watchlist", { movie_id: movieId });
  return response.data;
};

export const removeWatchlist = async (movieId) => {
  const response = await api.delete(`/watchlist/${movieId}`);
  return response.data;
};
