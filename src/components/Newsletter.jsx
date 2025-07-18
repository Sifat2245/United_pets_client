import React from "react";
import newsLetterImg from "../assets/newsletter.jpg";

const Newsletter = () => {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${newsLetterImg})`,
        backgroundPosition: 'bottom'
      }}
    >
      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* Content */}
      <div className="relative z-10 px-10 py-14 lg:py-26 lg:pl-72 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Subscribe to our newsletter
        </h1>
        <p className="md:text-md mb-6">
          We send emails once a month. No spam, ever.
        </p>

        <form className="flex flex-col sm:flex-row w-full max-w-lg">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-5 py-3 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none bg-white text-black placeholder-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#018AE0] text-white rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none hover:bg-[#0070b8] transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
