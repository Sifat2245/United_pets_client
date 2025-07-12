import React, { use } from "react";
import { FaGoogle, FaTwitter } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import useAxios from "../hooks/useAxios";

const SocialLogin = ({ onClose }) => {
  const { signInWithGoogle } = use(AuthContext);
  const axiosInstance = useAxios();
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const userInfo = {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        role: "user",
        created_at: new Date().toISOString(),
      };

      try {
        const res = await axiosInstance.post("/users", userInfo);
        console.log("User saved:", res.data);
      } catch (postError) {
        console.warn(
          "User might already exist:",
          postError.response?.data || postError.message
        );
      }

      if (onClose) onClose();
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center px-4 py-3 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-sm"
      >
        <FaGoogle className="h-5 w-5 mr-3" />
        Sign Up with Google
      </button>
      <button className="w-full flex items-center justify-center px-4 py-3 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-sm">
        <FaTwitter className="h-5 w-5 mr-3" />
        Sign Up with Twitter
      </button>
    </div>
  );
};

export default SocialLogin;
