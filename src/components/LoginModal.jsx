import { AnimatePresence, motion } from "framer-motion"; //eslint-disable-line
import { User, X } from "lucide-react";
import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import SocialLogin from "./SocialLogin";
import { AuthContext } from "../context/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";

const LoginModal = ({ isOpen, onClose, onOpenSignup }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { loginUser, loading, logOut } = use(AuthContext);
  const [statusMessage, setStatusMessage] = useState("");
  const axiosSecure = useAxiosSecure()

  const onSubmit = async (data) => {
    try {
      const result = await loginUser(data.email, data.password);
      const loggedUser = result.user;
      const res = await axiosSecure.get(`/user/email/${loggedUser.email}`);
      const dbUser = res.data;

      if (dbUser?.banned) {
        await logOut();
        setStatusMessage("Your account has been banned.");
        return;
      }
      reset();
      setStatusMessage("");
      onClose();
    } catch (error) {
      console.log("Login error", error);
      setStatusMessage("Login failed. Please check your credentials.");
    }
  };


  const handleSignupClick = (e) => {
    e.preventDefault();
    onClose();
    onOpenSignup();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-[#0000008e] bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => onClose()}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-[#018AE0]"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#018AE0] p-4 rounded-full shadow-lg">
              <User className="h-8 w-8 text-white" />
            </div>

            <div className="pt-12 pb-8 px-6 bg-[#018AE0] rounded-t-lg">
              <h2 className="text-3xl font-bold text-center text-white mb-6">
                Welcome Back!
              </h2>
            </div>

            <div className="p-6 bg-white rounded-b-lg">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="loginEmail" className="sr-only">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="loginEmail"
                    placeholder="Email Address"
                    className={`w-full px-4 py-2 border-b-2 ${
                      errors.email ? "border-red-500" : "border-blue-300"
                    } focus:border-[#018AE0] focus:outline-none transition-colors duration-200`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Email address is invalid",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="loginPassword" className="sr-only">
                    Password
                  </label>
                  <input
                    type="password"
                    id="loginPassword"
                    placeholder="Password"
                    className={`w-full px-4 py-2 border-b-2 ${
                      errors.password ? "border-red-500" : "border-blue-300"
                    } focus:border-[#018AE0] focus:outline-none transition-colors duration-200`}
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {statusMessage && (
                  <div
                    className={`p-3 rounded-md text-sm ${
                      statusMessage.includes("successful")
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                    role="alert"
                  >
                    {statusMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className={`w-full flex items-center justify-center gap-2 bg-[#D61C62] ${
                    loading
                      ? "bg-opacity-50 cursor-not-allowed"
                      : "hover:bg-pink-700"
                  } text-white font-semibold py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#D61C62] focus:ring-opacity-50`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                      </svg>
                      Logging in...
                    </>
                  ) : (
                    "LOGIN"
                  )}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Or sign up with
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <SocialLogin onClose={onClose}></SocialLogin>
              </div>

              <p className="mt-6 text-center text-gray-600 text-sm">
                Don't have an account?{" "}
                <a
                  href="#"
                  onClick={handleSignupClick}
                  className="text-[#018AE0] hover:underline font-medium"
                >
                  Create an account
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
