import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignupPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    if (username.trim().toLowerCase() === "admin") {
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

      {/* Sign Up Card */}
      <div className="relative z-10 w-full max-w-xl rounded-3xl border border-[#e7debb]/30 bg-[#27452f]/30 p-8 md:p-12 shadow-2xl">

        {/* Title */}
        <h1 className="text-5xl font-bold text-[#e7debb] text-center mb-10">
          Sign Up
        </h1>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-5">

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

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-xl bg-[#36573e]/70 px-5 py-3 text-[#e7debb] placeholder-[#e7debb] outline-none focus:ring-2 focus:ring-[#e7debb]"
          />

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full rounded-full bg-[#27452f] py-3 text-[#e7debb] font-semibold hover:bg-[#36573e] transition duration-300"
          >
            Sign Up
          </button>

          {/* Login */}
          <p className="text-center text-sm text-[#e7debb]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold hover:text-[#f5efd6] transition"
            >
              Login
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
};

export default SignupPage;