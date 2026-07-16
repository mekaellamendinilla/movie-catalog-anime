import api from "./api";
import axios from "axios";

const API_URL = "http://localhost:5000/api/movies";

export const getMovies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};



{/* 
export const getMovie=(id)=>{

    return api.get(`/movies/${id}`);

}

export const searchMovies=(title)=>{

    return api.get(`/movies/search?title=${title}`);

} */}