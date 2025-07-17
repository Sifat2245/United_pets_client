import React, { useRef } from "react";
import { motion, useInView } from "framer-motion"; //eslint-disable-line
import {
  FaPaw,
  FaLeaf,
  FaStethoscope,
  FaGraduationCap,
  FaHome,
  FaHeart,
  FaShieldAlt,
} from "react-icons/fa";
import featureImage from "../assets/features.jpg";
import footerImg from "../assets/pattern1.png";

const featuresLeft = [
  {
    icon: FaLeaf,
    title: "Natural Products",
    description:
      "We prioritize your pet's health by using only the finest organic ingredients and all-natural products in our grooming and feeding.",
  },
  {
    icon: FaStethoscope,
    title: "Vet Care",
    description:
      "Our on-site veterinary professionals provide comprehensive check-ups and preventative care to keep your companion happy and healthy.",
  },
  {
    icon: FaGraduationCap,
    title: "Training",
    description:
      "Expert-led training programs designed to improve obedience, socialization, and strengthen the bond between you and your pet.",
  },
];

const featuresRight = [
  {
    icon: FaHome,
    title: "Housing",
    description:
      "Clean, safe, and comfortable boarding facilities that feel like a home away from home, with spacious areas for play and rest.",
  },
  {
    icon: FaHeart,
    title: "Adoption",
    description:
      "We connect loving families with pets in need of a forever home, providing full support throughout the adoption process.",
  },
  {
    icon: FaShieldAlt,
    title: "Quality Care",
    description:
      "Our dedicated team of passionate pet lovers ensures every animal receives personalized attention and the highest standard of care.",
  },
];

const FeatureItem = ({ icon: Icon, title, description, direction }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const variants = {
    hidden: { opacity: 0, x: direction === "left" ? -100 : 100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex items-start gap-4 ${
        direction === "right" ? "text-left" : "text-right"
      } md:w-full`}
    >
      {/* Text content for right-aligned items */}
      {direction === "left" && (
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
      )}

      {/* Icon */}
      <div className="group flex-shrink-0">
        <div
          className="flex items-center justify-center h-16 w-16 rounded-full bg-[#D61C62] hover:bg-[#018AE0] shadow-lg transition-all duration-300 group-hover:scale-110"
          style={{ color: "#D61C62" }}
        >
          <Icon className="text-3xl text-white" />
        </div>
      </div>

      {/* Text content for left-aligned items */}
      {direction === "right" && (
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
      )}
    </motion.div>
  );
};

const OurFeature = () => {
  return (
    <div className="bg-neutral-100 pt-20 mb-24">
      <div className="text-center mb-18">
        <p className="text-sm uppercase tracking-widest mb-2">
          — BENEFITS FOR YOU —
        </p>
        <h2 className="text-4xl font-bold mb-4">OUR FEATURES</h2>
        <div className="text-[#018AE0]/50 rotate-12 text-xl flex justify-center">
          <FaPaw />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center px-32">
        {/* Left Column */}
        <div className="flex flex-col gap-12">
          {featuresLeft.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              direction="left"
            />
          ))}
        </div>

        {/* Center Image */}
        <div className="flex justify-center items-center px-8">
          <img
            src={featureImage}
            alt="Dog being groomed"
            className="rounded-lg max-h-[600px] object-contain"
          />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-12">
          {featuresRight.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              direction="right"
            />
          ))}
        </div>
      </div>

      <div
        className="text-center text-sm text-gray-500 w-full h-full py-10"
        style={{
          backgroundImage: `url(${footerImg})`,
          backgroundPosition: "bottom",
        }}
      ></div>
    </div>
  );
};

export default OurFeature;
