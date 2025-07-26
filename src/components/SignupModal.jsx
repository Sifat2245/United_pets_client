import { AnimatePresence, motion } from "framer-motion"; //eslint-disable-line
import { UserPlus, X, ImageIcon } from "lucide-react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import SocialLogin from "./SocialLogin";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import useAxios from "../hooks/useAxios";

const SignupModal = ({ isOpen, onClose, onOpenLogin }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const { createUser, updateUser, loading } = useContext(AuthContext);
  const [profileImagePreview, SetProfileImagePreview] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const password = watch("password", "");
  const [profileImage, setProfileImage] = useState("");
  const axiosInstance = useAxios();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    // console.log(file);
    if (file) {
      SetProfileImagePreview(URL.createObjectURL(file));
    } else {
      SetProfileImagePreview(null);
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "user_profile_image");
    formData.append(
      "cloud_name",
      `${import.meta.env.VITE_Cloudinary_cloudname}`
    );

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_Cloudinary_cloudname
      }/image/upload`,
      formData
    );
    // console.log(res.data);
    setProfileImage(res.data.url);
  };

  const onSubmit = (data) => {
    setStatusMessage("");
    createUser(data.email, data.password)
      .then(async () => {
        // console.log("account created", result.user);
        //update user
        const userProfile = {
          displayName: data.name,
          photoURL: profileImage,
        };

        updateUser(userProfile)
          .then(() => {
            // console.log("profile updated successfully");
            reset();
            SetProfileImagePreview(null);
            setStatusMessage("");
            onClose();
          })
          .catch((error) => {
            console.log(error.message);
          });

        const userInfo = {
          email: data.email,
          name: data.name,
          photoURL: profileImage,
          role: "user",
          created_at: new Date().toISOString(),
        };

        const res = await axiosInstance.post("/users", userInfo);
        console.log("User saved:", res.data);
      })
      .catch((error) => {
        console.log("error found", error);
      });
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    onClose();
    onOpenLogin();
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
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:[#018AE0]"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#018AE0] p-4 rounded-full shadow-lg">
              <UserPlus className="h-8 w-8 text-white" />
            </div>

            <div className="pt-12 pb-8 px-6 bg-[#018AE0] rounded-t-lg">
              <h2 className="text-2xl font-bold text-center text-white mb-6">
                Create Your Account
              </h2>
            </div>

            <div className="p-6 bg-white rounded-b-lg">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Image Upload Option */}
                <div className="flex flex-col items-center mb-4">
                  <label htmlFor="profileImage" className="cursor-pointer">
                    {profileImagePreview ? (
                      <img
                        src={profileImagePreview}
                        alt="Profile Preview"
                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-300 shadow-md"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-blue-300 shadow-md text-gray-500">
                        <ImageIcon className="h-12 w-12" />
                      </div>
                    )}
                  </label>

                  {/* This must be outside the label */}
                  <input
                    type="file"
                    id="profileImage" // ✅ MUST match label htmlFor
                    name="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  {errors.profileImage && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.profileImage.message}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-gray-600">
                    Upload Profile Picture
                  </p>
                </div>

                <div>
                  <label htmlFor="name" className="sr-only">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className={`w-full px-4 py-2 border-b-2 ${
                      errors.name ? "border-red-500" : "border-blue-300"
                    } focus:border-[#018AE0] focus:outline-none transition-colors duration-200`}
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="sr-only">
                    Email Address
                  </label>
                  <input
                    type="email"
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
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className={`w-full px-4 py-2 border-b-2 ${
                      errors.password ? "border-red-500" : "border-blue-300"
                    } focus:border-[#018AE0] focus:outline-none transition-colors duration-200`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className={`w-full px-4 py-2 border-b-2 ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-blue-300"
                    } focus:border-[#018AE0] focus:outline-none transition-colors duration-200`}
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword.message}
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
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-2 bg-[#D61C62] ${
                    loading
                      ? "bg-opacity-50 cursor-not-allowed"
                      : "hover:bg-pink-700"
                  } text-white font-semibold py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#D61C62] focus:ring-opacity-50`}
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
                      Signin In...
                    </>
                  ) : (
                    "SIGN UP"
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
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={handleLoginClick}
                  className="text-[#018AE0] hover:underline font-medium"
                >
                  Login here
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignupModal;
