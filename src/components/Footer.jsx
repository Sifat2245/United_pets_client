import React from "react";
import footerImg from "../assets/pattern1.png";
import logo from "../assets/logo.png";
import { Globe, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full pt-12 md:pt-16 text-gray-700 font-sans bg-[#f8f8f8]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-300 pb-8 mb-8">
          <div className="flex flex-col items-center  text-center md:text-left">
            <img src={logo} alt="United Pets Logo" className="mb-4 h-24 w-72" />
            <div className="flex space-x-4">
              <a
                href="https://saifuddin-ahmed-sifat.web.app/"
                target="_blank"
                aria-label="Facebook"
                className=" hover:text-blue-300 transition-colors duration-200"
              >
                <Globe className="h-5 w-5 hover:text-[#D61C62] transition-all duration-200" />
              </a>

              <a
                href="https://x.com/mdsifat1644976"
                target="_blank"
                aria-label="Twitter"
                className=" hover:text-blue-300 transition-colors duration-200"
              >
                <Twitter className="h-5 w-5 hover:text-[#D61C62] transition-all duration-200" />
              </a>

              <a
                href="https://www.instagram.com/sifat_224/"
                target="_blank"
                aria-label="Instagram"
                className=" hover:text-blue-300 transition-colors duration-200"
              >
                <Instagram className="h-5 w-5 hover:text-[#D61C62] transition-all duration-200" />
              </a>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              About us
            </h3>
            <p className="text-sm leading-relaxed">
              United Pets is dedicated to providing the best care and products
              for your beloved companions. We offer a wide range of services and
              high-quality pet supplies to ensure the happiness and well-being
              of every animal.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-center md:justify-start">
                <i className="fas fa-phone mr-2 text-gray-500"></i>
                <span className="hover:text-[#D61C62] transition-all duration-200">
                  (+880) 1903-321075
                </span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <i className="fas fa-envelope mr-2 text-gray-500"></i>
                <span className="hover:text-[#D61C62] transition-all duration-200">
                  mdsaifuddinahmed360@gmail.com
                </span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <i className="fas fa-map-marker-alt mr-2 text-gray-500"></i>
                <span className="hover:text-[#D61C62] transition-all duration-200">
                  Narayanganj - Bangladesh
                </span>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              About us
            </h3>
            <ul className="space-y-2 text-sm">
              <li>Open from 9am - 8pm</li>
              <li>Holidays - Closed</li>
              <li>Weekends - Closed</li>
            </ul>
          </div>
        </div>
        <div className="text-center">
          © 2024 - 2028{" "}
          <a href="#" className="text-blue-600 hover:underline">
            UNITEDPETS JOOMLA.
          </a>{" "}
          All Rights Reserved by{" "}
          <a href="#" className="text-blue-600 hover:underline">
            UNITED PETS.
          </a>
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

export default Footer;
