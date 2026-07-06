import { BrowserRouter, Router, Routes, Route } from "react-router-dom";


// LANDING PAGE
import AboutPage from "./pages/public-pages/AboutPage";
import LandingPage from "./pages/public-pages/LandingPage";
import LoginPage from "./pages/public-pages/LoginPage";
import SignupPage from "./pages/public-pages/SignupPage";


// USER PAGES
import HomePage from "./pages/user-pages/HomePage";
import MovieDetailsPage from "./pages/user-pages/MovieDetailsPage";
import FavoritePage from "./pages/user-pages/FavoritePage";
import WatchlistPage from "./pages/user-pages/WatchlistPage";
import UserProfile from "./pages/user-pages/UserProfile";


// ADMIN PAGES
import CategoryPage from "./pages/admin-pages/CategoryPage";
import AdminDashboardPage from "./pages/admin-pages/AdminDashboardPage";
import MoviesPage from "./pages/admin-pages/MoviesPage";
import UsersPage from "./pages/admin-pages/UsersPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/home" element={<HomePage />} />
        <Route path="/movie-details" element={<MovieDetailsPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/profile" element={<UserProfile />} />

        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin-users" element={<UsersPage />} />
        <Route path="/admin-movies" element={<MoviesPage />} />
        <Route path="/admin-categories" element={<CategoryPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}
