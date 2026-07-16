import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { registerUser } from "../../services/authService";

const SignupPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.first_name || !form.last_name || !form.username || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        first_name: form.first_name,
        last_name: form.last_name,
        username: form.username,
        email: form.email,
        password: form.password,
      });

      setSuccess("Account created successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-5" style={{ backgroundImage: "url('/images/log-sign-image/bg-image.jpg')" }}>
      <div className="absolute inset-0 bg-black/35"></div>

      <div className="relative z-10 w-full max-w-xl rounded-3xl border border-[#e7debb]/30 bg-[#27452f]/30 p-8 md:p-12 shadow-2xl">
        <h1 className="text-5xl font-bold text-[#e7debb] text-center mb-10">Sign Up</h1>

        <form onSubmit={handleSignup} className="space-y-5">
          <input type="text" name="first_name" placeholder="First name" value={form.first_name} onChange={handleChange} className="w-full rounded-xl bg-[#36573e]/70 px-5 py-3 text-[#e7debb] placeholder-[#e7debb] outline-none focus:ring-2 focus:ring-[#e7debb]" />
          <input type="text" name="last_name" placeholder="Last name" value={form.last_name} onChange={handleChange} className="w-full rounded-xl bg-[#36573e]/70 px-5 py-3 text-[#e7debb] placeholder-[#e7debb] outline-none focus:ring-2 focus:ring-[#e7debb]" />
          <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} className="w-full rounded-xl bg-[#36573e]/70 px-5 py-3 text-[#e7debb] placeholder-[#e7debb] outline-none focus:ring-2 focus:ring-[#e7debb]" />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full rounded-xl bg-[#36573e]/70 px-5 py-3 text-[#e7debb] placeholder-[#e7debb] outline-none focus:ring-2 focus:ring-[#e7debb]" />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full rounded-xl bg-[#36573e]/70 px-5 py-3 text-[#e7debb] placeholder-[#e7debb] outline-none focus:ring-2 focus:ring-[#e7debb]" />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} className="w-full rounded-xl bg-[#36573e]/70 px-5 py-3 text-[#e7debb] placeholder-[#e7debb] outline-none focus:ring-2 focus:ring-[#e7debb]" />

          {error ? <p className="rounded-lg bg-red-950/40 px-3 py-2 text-sm text-red-100">{error}</p> : null}
          {success ? <p className="rounded-lg bg-emerald-950/40 px-3 py-2 text-sm text-emerald-100">{success}</p> : null}

          <button type="submit" disabled={loading} className="w-full rounded-full bg-[#27452f] py-3 text-[#e7debb] font-semibold hover:bg-[#36573e] transition duration-300 disabled:opacity-70">
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="text-center text-sm text-[#e7debb]">
            Already have an account? <Link to="/login" className="font-semibold hover:text-[#f5efd6] transition">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;