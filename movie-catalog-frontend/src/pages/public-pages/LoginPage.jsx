import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
    e.preventDefault();

    if (username.toLowerCase() === "admin" && password === "admin123") {
        navigate("/admin-dashboard");
    } else {
        navigate("/home");
    }
};

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-5"
      style={{
        backgroundImage: "url('/images/log-sign-image/bg-image.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-xl rounded-3xl border border-[#e7debb]/30 bg-[#27452f]/30 p-8 md:p-12 shadow-2xl">

        {/* Title */}
        <h1 className="text-5xl font-bold text-[#e7debb] text-center mb-10">
          Login
        </h1>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-xl bg-[#36573e]/70 px-5 py-3 text-[#e7debb] placeholder-[#e7debb] outline-none focus:ring-2 focus:ring-[#e7debb]"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl bg-[#36573e]/70 px-5 py-3 text-[#e7debb] placeholder-[#e7debb] outline-none focus:ring-2 focus:ring-[#e7debb]"
          />

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-full bg-[#27452f] py-3 text-[#e7debb] font-semibold hover:bg-[#36573e] transition duration-300"
          >
            Login
          </button>

          {/* Signup */}
          <p className="text-center text-sm text-[#e7debb]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold hover:text-[#f5efd6] transition"
            >
              Sign Up
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
};

export default LoginPage;