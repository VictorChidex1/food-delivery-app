import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Get our "Database"
    const existingUsers = JSON.parse(localStorage.getItem("usersDB") || "[]");

    // 2. Find the user with matching email AND password
    const validUser = existingUsers.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );

    if (validUser) {
      // SUCCESS: User found in database!
      // We extract the REAL fullName they signed up with.

      localStorage.setItem(
        "user",
        JSON.stringify({
          fullName: validUser.fullName,
          email: validUser.email,
        })
      );

      // Redirect to Home
      // toast.success(`Welcome back, ${validUser.fullName}!`);
      navigate("/");
      window.location.reload();
    } else {
      // FAILURE: No match found.
      // Strict Access: We do NOT create a temporary profile. We block them.
      alert(
        "Invalid email or password. Please Sign Up if you don't have an account."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-[#FF5200] hover:text-orange-600 transition-colors"
            >
              Sign up for free
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Field */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#FF5200] transition-colors" />
              </div>
              <input
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF5200] focus:border-transparent transition-all"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field with Eye Icon */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#FF5200] transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                className="appearance-none rounded-lg relative block w-full pl-10 pr-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF5200] focus:border-transparent transition-all"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#FF5200] focus:ring-[#FF5200] border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900 cursor-pointer"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-[#FF5200] hover:text-orange-500"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-full text-white bg-[#FF5200] hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5200] transition-all transform hover:scale-[1.02] shadow-lg"
          >
            Sign in
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
