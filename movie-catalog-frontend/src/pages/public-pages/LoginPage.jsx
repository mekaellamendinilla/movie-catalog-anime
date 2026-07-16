import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser({ email: form.email, password: form.password });
      login(response.user);

      if (response.user?.role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-5" style={{ backgroundImage: "url('/images/log-sign-image/bg-image.jpg')" }}>
      <div className="absolute inset-0 bg-black/35"></div>

      <div className="relative z-10 w-full max-w-xl rounded-3xl border border-[#e7debb]/30 bg-[#27452f]/30 p-8 md:p-12 shadow-2xl">
        <h1 className="text-5xl font-bold text-[#e7debb] text-center mb-10">Login</h1>

        <form onSubmit={handleLogin} className="space-y-5">
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full rounded-xl bg-[#36573e]/70 px-5 py-3 text-[#e7debb] placeholder-[#e7debb] outline-none focus:ring-2 focus:ring-[#e7debb]" />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full rounded-xl bg-[#36573e]/70 px-5 py-3 text-[#e7debb] placeholder-[#e7debb] outline-none focus:ring-2 focus:ring-[#e7debb]" />

          {error ? <p className="rounded-lg bg-red-950/40 px-3 py-2 text-sm text-red-100">{error}</p> : null}

          <button type="submit" disabled={loading} className="w-full rounded-full bg-[#27452f] py-3 text-[#e7debb] font-semibold hover:bg-[#36573e] transition duration-300 disabled:opacity-70">
            {loading ? "Signing in..." : "Login"}
          </button>

          <p className="text-center text-sm text-[#e7debb]">
            Don't have an account? <Link to="/signup" className="font-semibold hover:text-[#f5efd6] transition">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;