import React from "react";
import PageHeading from "../components/reuseable/pageHeadinng";
import serviceImg1 from "../assets/serviceimg1.jpg";
import bgImg from "../assets/pattern1.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import serviceImg2 from "../assets/contact.jpg";
import { Link } from "react-router";
import serviceImg3 from "../assets/servicesimg2.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Custom SVG Icons to match the design
const TrainingIcon = () => (
  <svg
    className="w-12 h-12 text-[#D61C62] mx-auto"
    viewBox="0 0 64 64"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M32 34.6c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm12.2-20.4l-3.6 3.6c-1.6-1-3.4-1.6-5.4-1.6-4.4 0-8 3.6-8 8s3.6 8 8 8c2 0 3.8-.7 5.4-1.6l3.6 3.6c-2.4 1.8-5.4 3-8.8 3-6.6 0-12-5.4-12-12s5.4-12 12-12c3.4 0 6.4 1.2 8.8 3zM21.2 48.8c-3.4 0-6.2-2.8-6.2-6.2s2.8-6.2 6.2-6.2 6.2 2.8 6.2 6.2-2.8 6.2-6.2 6.2zM52 42H40c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V44c0-1.1-.9-2-2-2z" />
  </svg>
);
const ActivitiesIcon = () => (
  <svg
    className="w-12 h-12 text-[#D61C62] mx-auto"
    viewBox="0 0 64 64"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M52 24c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2s2-.9 2-2V26c0-1.1-.9-2-2-2zM12 24c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2s2-.9 2-2V26c0-1.1-.9-2-2-2zM32 8c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 24c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12z" />
  </svg>
);
const PetHotelIcon = () => (
  <svg
    className="w-12 h-12 text-[#D61C62] mx-auto"
    viewBox="0 0 64 64"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M54 24H10c-1.1 0-2 .9-2 2v28c0 1.1.9 2 2 2h44c1.1 0 2-.9 2-2V26c0-1.1-.9-2-2-2zm-2 28H12V28h40v24zM32 4c-4.4 0-8 3.6-8 8v8h16v-8c0-4.4-3.6-8-8-8z" />
  </svg>
);
const GroomingIcon = () => (
  <svg
    className="w-12 h-12 text-[#D61C62] mx-auto"
    viewBox="0 0 64 64"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.7 19.3c-2-2-5.1-2-7.1 0s-2 5.1 0 7.1 5.1 2 7.1 0 2-5.1 0-7.1zM48.6 35.4c-2-2-5.1-2-7.1 0s-2 5.1 0 7.1 5.1 2 7.1 0 2-5.1 0-7.1zM32 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm-16.9 31.1l-4.2-4.2c-1.6-1.6-4.1-1.6-5.7 0-1.6 1.6-1.6 4.1 0 5.7l4.2 4.2c1.6 1.6 4.1 1.6 5.7 0 1.6-1.6 1.6-4.1 0-5.7zM53.1 11.1l-4.2-4.2c-1.6-1.6-4.1-1.6-5.7 0-1.6 1.6-1.6 4.1 0 5.7l4.2 4.2c1.6 1.6 4.1 1.6 5.7 0 1.6-1.6 1.6-4.1 0-5.7z" />
  </svg>
);

const Services = () => {
  const servicesData = [
    {
      icon: <TrainingIcon />,
      title: "Training",
      description:
        "Our professional trainers offer obedience and behavioral training for dogs of all ages.",
    },
    {
      icon: <ActivitiesIcon />,
      title: "Activities",
      description:
        "Fun and engaging group activities to keep your pet physically and mentally stimulated.",
    },
    {
      icon: <PetHotelIcon />,
      title: "Pet Hotel",
      description:
        "Safe, comfortable, and caring boarding services for when you are away.",
    },
    {
      icon: <GroomingIcon />,
      title: "Grooming Services",
      description:
        "Professional grooming to keep your pet looking and feeling their best.",
    },
    {
      icon: <TrainingIcon />,
      title: "Vet Services",
      description:
        "Complete veterinary care, from routine checkups to emergency services.",
    },
  ];

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
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div>
      <PageHeading
        title={"Services"}
        breadcrumb={[
          { label: "Home", link: "/" },
          { label: "Services", link: "/services", active: true },
        ]}
      ></PageHeading>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-bold text-gray-800 leading-tight">
              Quality for your best friend
            </h2>
            <p className="mt-4 text-lg font-semibold text-[#D61C62]">
              We offer quick & easy services for cats and dogs
            </p>
            <hr className="w-24 border-t-2 border-gray-200 my-6 mx-auto lg:mx-0" />
            <p className="mt-4 text-gray-600 text-base leading-relaxed">
              At our clinic in Dhaka, we are dedicated to providing the highest
              level of veterinary medicine along with friendly, compassionate
              service. We believe in treating every patient as if they were our
              own pet, and we are honored to be your partner in your pet's
              health care.
            </p>
            <div className="mt-8">
              <a
                href="/contact"
                className="inline-block bg-blue-500 text-white font-bold text-sm uppercase px-8 py-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={serviceImg1}
              alt="A happy dog with its owner"
              className="rounded-lg w-full max-w-md lg:max-w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      <div className="pt-16 sm:pt-24 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Slider {...sliderSettings}>
            {servicesData.map((service, index) => (
              <div key={index} className="px-4">
                <div className="text-center p-6">
                  {service.icon}
                  <h3 className="mt-4 text-2xl font-bold text-gray-800">
                    {service.title}
                  </h3>
                  <p className="mt-8 text-gray-600 h-20">
                    {service.description}
                  </p>
                  <a
                    href="#"
                    className="mt-4 inline-block text-blue-600 font-semibold border-b-2 border-blue-600 hover:text-blue-800"
                  >
                    &laquo; read more
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div
          className="text-center text-sm text-gray-500 w-full h-full py-10"
          style={{
            backgroundImage: `url(${bgImg})`,
            backgroundPosition: "bottom",
          }}
        ></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <img src={serviceImg2} alt="" />
        </div>
        <div className="bg-[#1446A0] text-white flex text-center justify-center items-center flex-col space-y-4 py-16">
          <h1 className="text-3xl font-bold">Get in touch with us</h1>
          <p className="text-md">
            Please feel free to get in touch via the form below, or contact us
            using <br /> the information provided.
          </p>
          <Link to={"/contact"}>
            <button className="px-8 py-2 bg-[#D61C62] rounded-full mt-6">
              Contact Us
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 w-2/3 mx-auto my-24">
        <div>
          <img src={serviceImg3} alt="" />
        </div>
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-12">Frequently Asked Questions</h1>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-[#1446A0] text-xl font-bold">
                Our Philosophy
              </AccordionTrigger>
              <AccordionContent>
                Our core philosophy is simple: provide outstanding medical care
                with compassion and respect for both pets and their owners. We
                strive to create a stress-free experience and build lasting
                relationships based on trust and mutual love for animals.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-[#1446A0] text-xl font-bold">
                Our Organization
              </AccordionTrigger>
              <AccordionContent>
                Since our establishment, we have become a trusted name in pet
                healthcare in Dhaka. Our growth is a testament to our unwavering
                commitment to excellence and the strong bonds we've built within
                the community. We are proud to be a locally owned and operated
                clinic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-[#1446A0] text-xl font-bold">
                Partnerships with our Team
              </AccordionTrigger>
              <AccordionContent>
                We actively partner with local animal welfare organizations and
                rescue groups in Bangladesh, such as Obhoyaronno and PAW
                Foundation, to provide medical support for stray and abandoned
                animals. Our team believes in giving back to the community that
                supports us.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Services;
