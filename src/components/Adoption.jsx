import React from "react";
import adoptionBg from "../assets/adoptionbg.jpg";
import { FaChevronLeft, FaChevronRight, FaPaw } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PetCard from "./PetCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router";

const Adoption = () => {
  const axiosSecure = useAxiosSecure();

  const { data: pets = [], isLoading } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pets/latest");
      return res.data;
    },
  });

  const NextArrow = ({ onClick }) => (
    <div
      className="absolute -right-6 top-1/2 transform -translate-y-2/3 z-10 cursor-pointer text-[#D61C62] hover:text-[#018AE0]"
      onClick={onClick}
    >
      <FaChevronRight size={28} />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-[#D61C62] hover:text-[#018AE0]"
      onClick={onClick}
    >
      <FaChevronLeft size={28} />
    </div>
  );
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (isLoading) {
    return <span>loading....</span>;
  }
  return (
    <div
      style={{
        backgroundImage: `url(${adoptionBg})`,
      }}
      className="bg-no-repeat bg-center bg-cover py-16 sm:py-24 relative bg-fixed"
    >
      <div className="absolute inset-0 bg-neutral-800/85 z-0"></div>

      <div className="relative">
        <div className="text-center mb-24">
          <p className="text-sm text-white uppercase tracking-widest mb-2">
            — FIND YOUR FRIEND —
          </p>
          <h2 className="text-5xl font-bold text-white mb-4">ADOPTION</h2>
          <div className="text-[#018AE0]/50 rotate-12 text-xl flex justify-center">
            <FaPaw />
          </div>
        </div>
        <div className="text-center">
          <h2 className="font-bold text-3xl text-white mb-4">
            Adopting is an act of <span className="text-[#D61C62]">love</span>
          </h2>
          <p className="text-white text-lg mb-4">
            {" "}
            When you adopt a pet, you're not just getting a friend—you’re saving
            a life.
          </p>
          <p className="text-white font-semibold  mb-4">
            {" "}
            Every pet deserves a safe and loving home. By adopting, you give
            them a second chance, and in return, they fill your life with joy,
            loyalty, <br /> and unconditional love. Explore our list of
            adoptable pets and start your journey toward companionship.
          </p>
        </div>
      </div>

      <Slider {...sliderSettings} className="mt-16 px-6 max-w-7xl mx-auto">
        {pets.slice(0, 6).map((pet) => (
          <div key={pet._id} className="px-2">
            <PetCard pet={pet} />
          </div>
        ))}
      </Slider>

      <div className="text-center relative mt-16">
        <Link to={"/Adopt"}>
          <button className="bg-[#D61C62] hover:bg-[#018AE0] transition-all duration-300 py-2 px-6 font-semibold text-lg rounded-full text-white">
            See All Pets
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Adoption;
