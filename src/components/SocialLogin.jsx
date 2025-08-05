import React, { use } from "react";
import { FaGoogle, FaTwitter } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import useAxios from "../hooks/useAxios";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const SocialLogin = ({ onClose }) => {
  const { signInWithGoogle, signInWithTwitter, logOut } = use(AuthContext);
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      const res = await axiosSecure.get(`/user/email/${user.email}`);
      const dbUser = res.data;

      if (dbUser?.banned) {
        await logOut();
        Swal.fire("Access Denied", "Your account has been banned.", "error");
        return;
      }

      const userInfo = {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        role: "user",
        created_at: new Date().toISOString(),
      };

      try {
        const res = await axiosInstance.post("/users", userInfo);
        console.log(res.data);
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

  const handleTwitterLogin = async () => {
    try {
      const result = await signInWithTwitter();
      const user = result.user;

      const res = await axiosSecure.get(`/user/email/${user.email}`);
      const dbUser = res.data;

      if (dbUser?.banned) {
        await logOut();
        Swal.fire("Access Denied", "Your account has been banned.", "error");
        return;
      }

      const userInfo = {
        email: user.email || `${user.uid}@twitter.local`,
        name: user.displayName || "Twitter User",
        photoURL: user.photoURL,
        role: "user",
        created_at: new Date().toISOString(),
      };

      try {
        const res = await axiosInstance.post("/users", userInfo);
        console.log(res.data);
      } catch (postError) {
        console.warn(
          "User might already exist:",
          postError.response?.data || postError.message
        );
      }

      if (onClose) onClose();
    } catch (error) {
      console.error("twitter login failed:", error);
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
      <button
        onClick={handleTwitterLogin}
        className="w-full flex items-center justify-center px-4 py-3 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-sm"
      >
        <FaTwitter className="h-5 w-5 mr-3" />
        Sign Up with Twitter
      </button>
    </div>
  );
};

export default SocialLogin;
