import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";
// import { toast } from "sonner"; // Uncomment if you are using Sonner for alerts

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validation
    if (formData.password !== formData.confirmPassword) {
      alert("Error: Passwords do not match!");
      return;
    }

    // 2. Load existing users "Database"
    const existingUsers = JSON.parse(localStorage.getItem("usersDB") || "[]");

    // 3. Check if email already exists
    const userExists = existingUsers.find(
      (u) => u.email.toLowerCase() === formData.email.toLowerCase()
    );
    if (userExists) {
      alert("This email is already registered. Please Login.");
      return;
    }

    // 4. Create new user object
    const newUser = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password, // In a real app, never save passwords like this!
    };

    // 5. Save to "Database"
    existingUsers.push(newUser);
    localStorage.setItem("usersDB", JSON.stringify(existingUsers));

    // 6. Set Active Session (Auto-login after signup)
    // We only save the necessary info for the session, not the password
    localStorage.setItem(
      "user",
      JSON.stringify({
        fullName: newUser.fullName,
        email: newUser.email,
      })
    );

    // Redirect to Home
    // toast.success("Account created successfully!");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-[#FF5200] hover:text-orange-600 transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Full Name */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#FF5200] transition-colors" />
              </div>
              <input
                name="fullName"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF5200] focus:border-transparent transition-all"
                placeholder="Full Name"
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#FF5200] transition-colors" />
              </div>
              <input
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF5200] focus:border-transparent transition-all"
                placeholder="Email address"
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#FF5200] transition-colors" />
              </div>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="appearance-none rounded-lg relative block w-full pl-10 pr-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF5200] focus:border-transparent transition-all"
                placeholder="Password"
                onChange={handleChange}
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

            {/* Confirm Password */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CheckCircle className="h-5 w-5 text-gray-400 group-focus-within:text-[#FF5200] transition-colors" />
              </div>
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                className="appearance-none rounded-lg relative block w-full pl-10 pr-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF5200] focus:border-transparent transition-all"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-full text-white bg-[#FF5200] hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5200] transition-all transform hover:scale-[1.02] shadow-lg"
          >
            Create Account
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
