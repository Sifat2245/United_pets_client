import React from "react";
import heroBg from "../assets/slide1-parallax.jpg";
import heroImg from "../assets/slide1-element.png";
import { motion } from "framer-motion"; // eslint-disable-line

const Hero = () => {
  const handleClick = () =>{
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <div
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative min-h-[80vh] bg-fixed text-white text-center flex justify-center items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <motion.div
        className="relative space-y-4 text-center px-4 md:pb-52"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-2xl md:text-4xl lg:text-5xl pb-3"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="font-bold">WELCOME TO</span> UNITED PETS
        </motion.h1>
        <motion.p
          className="font-semibold text-sm md:text-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          We offer the best services for your pets, contact us today and book a
          service
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          onClick={handleClick}
          className="bg-[#018AE0] px-8 py-2 md:px-12 md:py-3 rounded-4xl font-semibold hover:bg-[#0174e0] cursor-pointer"
        >
          CONTACT US
        </motion.button>
      </motion.div>
      <motion.img
        src={heroImg}
        className="absolute bottom-0 xl:max-w-7xl"
        alt=""
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      />
    </div>
  );
};

export default Hero;
