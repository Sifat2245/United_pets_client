import React from "react";
import serviceImage from "../assets/introimg1.jpg";
import { FaPaw, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import servicImage from "../assets/service card/service1.jpg";
import groomingImage from "../assets/service card/service2.jpg";
import adoptionImage from "../assets/service card/service3.jpg";
import dogWalkerImage from "../assets/service card/service4.jpg";
import dogImage from "../assets/service card/service5.jpg";
import Slider from "react-slick";
import { Link } from "react-router";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} !flex items-center justify-center bg-white/50 hover:bg-white rounded-full w-10 h-10`}
      onClick={onClick}
      style={{ ...style, right: "-40px" }}
    >
      <FaChevronRight className="text-[#1D4ED8]" />
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} !flex items-center justify-center bg-white/50 hover:bg-white rounded-full w-10 h-10`}
      onClick={onClick}
      style={{ ...style, left: "-40px" }}
    >
      <FaChevronLeft className="text-[#1D4ED8]" />
    </div>
  );
};

const OurService = () => {
  const services = [
    {
      title: "ADOPTION",
      image: adoptionImage,
      description:
        "Find your perfect furry companion through our trusted pet adoption services, connecting animals with loving homes.",
    },
    {
      title: "GROOMING",
      image: groomingImage,
      description:
        "Keep your pets looking and feeling their best with our professional grooming services including bathing, trimming, and nail care.",
    },
    {
      title: "DOG WALKER",
      image: dogWalkerImage,
      description:
        "Busy schedule? Our experienced dog walkers ensure your pet gets the daily exercise and attention they need.",
    },
    {
      title: "AGILITY",
      image: dogImage,
      description:
        "Enhance your dog’s fitness, confidence, and obedience with our fun and challenging agility training sessions.",
    },
    {
      title: "VETERINARIAN",
      image: servicImage,
      description:
        "Access expert veterinary care for check-ups, vaccinations, and treatment to keep your pets healthy and happy.",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280, // for xl screens and below
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // for md screens and below
        settings: {
          slidesToShow: 1,
          arrows: false, // Hide arrows on smaller screens
        },
      },
    ],
    // Custom dots to match your design
    appendDots: (dots) => (
      <div>
        <ul className="m-0"> {dots} </ul>
      </div>
    ),
    // customPaging: (i) => (
    //   <div className="w-3 h-3 bg-gray-300 rounded-full transition-all duration-300 hover:bg-[#D61C62]"></div>
    // ),
  };

  return (
    <div className="w-3/4 mx-auto py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">
            — WHAT WE OFFER —
          </p>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            OUR SERVICES
          </h2>
          <div className="text-[#018AE0]/50 rotate-12 text-xl flex justify-center">
            <FaPaw />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Column: Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Quality Services for Your Pets
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              We offer quick & easy services for cats and dogs, focusing on
              their health, happiness, and well-being. Our dedicated team
              provides comprehensive care tailored to your pet's needs.
            </p>
            <p className="text-gray-600 font-semibold leading-relaxed mb-8">
              From routine check-ups and vaccinations to grooming and
              specialized treatments, we ensure your furry friends receive the
              highest standard of care in a comfortable and loving environment.
            </p>
            <Link to={"/contact"}>
              <button className="bg-[#018AE0] text-white px-8 py-3 rounded-md shadow-lg hover:bg-[#018ae0e0] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                CONTACT US
              </button>
            </Link>
          </div>

          {/* Right Column: Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src={serviceImage}
              alt="Adorable Cat Resting"
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="px-4 sm:px-6 md:px-10 lg:px-12 py-10 sm:py-12 md:py-16 bg-white">
          <Slider {...sliderSettings}>
            {services.map((service, index) => (
              <div key={index} className="px-2 sm:px-4 md:px-6 lg:px-8">
                <div className="bg-[#f4f4f4] rounded-xl shadow-lg overflow-hidden flex flex-col h-full">
                  {/* Top Section */}
                  <div className="p-4 sm:p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-24 h-24 sm:w-28 sm:h-28 md:w-38 md:h-38 rounded-full object-cover border-8 border-white shadow"
                      />
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl text-[#1D2B68] uppercase tracking-wide mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xs mx-auto h-20 overflow-hidden">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom Section */}
                  <div className="bg-[#1446A0] mt-auto p-4 sm:p-6 text-center relative overflow-hidden">
                    {/* Decorative Paw Prints */}
                    <FaPaw className="absolute text-white/10 text-5xl -top-2 -left-3 transform rotate-12" />
                    <FaPaw className="absolute text-white/10 text-6xl -bottom-4 -right-4 transform -rotate-12" />

                    <Link to={'/services'}>
                      <button className="bg-[#D61C62] text-white font-semibold text-sm sm:text-base py-2 px-6 sm:px-8 rounded-full hover:bg-[#018AE0] transition-all duration-300">
                        READ MORE
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default OurService;
