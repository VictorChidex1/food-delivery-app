import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // SIMULATE API CALL: Wait 1.5 seconds then show success
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            /* --- STATE 1: INPUT FORM --- */
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="text-center">
                <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
                  Forgot Password?
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Don't worry! It happens. Please enter the email associated
                  with your account.
                </p>
              </div>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#FF5200] transition-colors" />
                  </div>
                  <input
                    type="email"
                    required
                    className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF5200] focus:border-transparent transition-all"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-full text-white bg-[#FF5200] hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5200] transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    "Send Reset Code"
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            /* --- STATE 2: SUCCESS MESSAGE --- */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Check your inbox
              </h2>
              <p className="text-gray-600 mb-8">
                We sent a password reset link to <br />
                <span className="font-semibold text-gray-900">{email}</span>
              </p>

              <button
                onClick={() => setIsSubmitted(false)}
                className="text-sm text-gray-500 hover:text-[#FF5200] underline decoration-dotted underline-offset-4"
              >
                Did not receive the email? Resend
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- FOOTER: BACK TO LOGIN --- */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-[#FF5200] transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
