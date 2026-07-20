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
  
  // states para sa visibility ng passwords
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-5 py-10" style={{ backgroundImage: "url('/images/log-sign-image/bg-image.jpg')" }}>
      <div className="absolute inset-0 bg-black/35"></div>

      <div className="relative z-10 w-full max-w-xl rounded-3xl border border-[#e7debb]/30 bg-[#27452f]/30 p-8 md:p-12 shadow-2xl pt-16 md:pt-20">
        
        <Link 
          to="/" 
          className="absolute top-6 left-6 flex items-center gap-2 text-sm text-[#e7debb]/80 hover:text-[#e7debb] transition-all duration-300 group font-montserrat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Home
        </Link>

        <h1 className="text-5xl font-bold text-[#e7debb] text-center mb-10">Sign Up</h1>

        <form onSubmit={handleSignup} className="space-y-5">
          <input type="text" name="first_name" placeholder="First name" value={form.first_name} onChange={handleChange} className="w-full rounded-xl bg-[#36573e]/70 px-5 py-3 text-[#e7debb] placeholder-[#e7debb] outline-none focus:ring-2 focus:ring-[#e7debb]" />
          <input type="text" name="last_name" placeholder="Last name" value={form.last_name} onChange={handleChange} className="w-full rounded-xl bg-[#36573e]/70 px-5 py-3 text-[#e7debb] placeholder-[#e7debb] outline-none focus:ring-2 focus:ring-[#e7debb]" />
          <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} className="w-full rounded-xl bg-[#36573e]/70 px-5 py-3 text-[#e7debb] placeholder-[#e7debb] outline-none focus:ring-2 focus:ring-[#e7debb]" />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full rounded-xl bg-[#36573e]/70 px-5 py-3 text-[#e7debb] placeholder-[#e7debb] outline-none focus:ring-2 focus:ring-[#e7debb]" />

          <div className="relative w-full">
            <input 
              type={showPassword ? "text" : "password"} 
              name="password" 
              placeholder="Password" 
              value={form.password} 
              onChange={handleChange} 
              className="w-full rounded-xl bg-[#36573e]/70 pl-5 pr-12 py-3 text-[#e7debb] placeholder-[#e7debb] outline-none focus:ring-2 focus:ring-[#e7debb]" 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#e7debb]/70 hover:text-[#e7debb] transition-colors focus:outline-none"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 1-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              )}
            </button>
          </div>

          <div className="relative w-full">
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              name="confirmPassword" 
              placeholder="Confirm Password" 
              value={form.confirmPassword} 
              onChange={handleChange} 
              className="w-full rounded-xl bg-[#36573e]/70 pl-5 pr-12 py-3 text-[#e7debb] placeholder-[#e7debb] outline-none focus:ring-2 focus:ring-[#e7debb]" 
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#e7debb]/70 hover:text-[#e7debb] transition-colors focus:outline-none"
            >
              {showConfirmPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 1-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              )}
            </button>
          </div>

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