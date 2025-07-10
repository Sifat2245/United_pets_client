import React, { use } from "react";
import { FaGoogle, FaTwitter } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const SocialLogin = ({onClose}) => {

  const {signInWithGoogle} = use(AuthContext)
  const handleGoogleLogin = () => {
    signInWithGoogle()
    .then(result =>{
      console.log('login successful', result);
       if (onClose) onClose()
    })
    .catch(error =>{
      console.log('error found', error);
    })
    
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
       
        className="w-full flex items-center justify-center px-4 py-3 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-sm"
      >
        <FaTwitter className="h-5 w-5 mr-3" />
        Sign Up with Twitter
      </button>
    </div>
  );
};

export default SocialLogin;
