import React from "react";
import Slider from "react-slick";
import { FaPaw, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import teamMember1 from '../assets/teamMember/team1.jpg'
import teamMember2 from '../assets/teamMember/team2.jpg'
import teamMember3 from '../assets/teamMember/team3.jpg'
import teamMember4 from '../assets/teamMember/team4.jpg'
import teamMember5 from '../assets/teamMember/team5.jpg'

const teamMembers = [
  {
    id: 1,
    name: "Laura Smith",
    role: "Veterinarian",
    image:teamMember1,
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    id: 2,
    name: "John Doe",
    role: "Pet Trainer",
    image: teamMember2,
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    id: 3,
    name: "Meghan Smith",
    role: "Cat Specialist",
    image: teamMember3,
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    id: 4,
    name: "David Chen",
    role: "Grooming Expert",
    image: teamMember4,
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    id: 5,
    name: "Mika Doe",
    role: "Grooming Expert",
    image: teamMember5,
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
];

const TeamCard = ({ member }) => (
  <div className="px-3 py-4">
    <div className="bg-white rounded-lg overflow-hidden group">
      <div className="relative h-72">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="py-4 text-left ">
        <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
        <p className="text-[#018AE0] font-medium mb-4">{member.role}</p>
        <div className="flex space-x-3 ">
          <a
            href={member.social.facebook}
            className="text-gray-400 hover:text-[#D61C62] transition-colors"
          >
            <FaFacebookF />
          </a>
          <a
            href={member.social.twitter}
            className="text-gray-400 hover:text-[#D61C62] transition-colors"
          >
            <FaTwitter />
          </a>
          <a
            href={member.social.linkedin}
            className="text-gray-400 hover:text-[#D61C62] transition-colors"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </div>
  </div>
);

const OurTeam = () => {
  const settings = {
    dots: false, // Hides the dots at the bottom
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Default for desktop (lg, xl)
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Hides default arrows, can be replaced with custom ones if needed
    responsive: [
      {
        breakpoint: 1024, // Medium devices (md)
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // Small devices (sm)
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };


  return (
    <div className="mb-16">
      <div className="w-2/3 mx-auto px-4">
        <div className="text-center mb-12">
        <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">
          — QUALIFIED PROFESSIONALS —
        </p>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">OUR TEAM</h2>
        <div className="text-[#018AE0]/50 rotate-12 text-xl flex justify-center">
          <FaPaw />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:pr-8 text-center lg:text-left">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Meet our professionals
            </h3>
            <p className="text-gray-600 mb-8">
              We have an experienced and qualified team dedicated to providing the best care for your beloved friend. Our professionals are passionate about animals and committed to their well-being.
            </p>
            <button className="bg-[#D61C62] text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-lg">
              VIEW ALL TEAM
            </button>
          </div>

          {/* Right Column: Slider */}
          <div className="lg:col-span-2">
            <Slider {...settings}>
              {teamMembers.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
