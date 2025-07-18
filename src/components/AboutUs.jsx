import { motion, AnimatePresence } from "framer-motion"; //eslint-disable-line
// Import your assets
import aboutBg from "../assets/aboutbg.jpg";
import missionImage from "../assets/aboutImages/missionImg.jpg";
import eventsImage from "../assets/aboutImages/evetImg.jpg";
import testimonialsImage from "../assets/aboutImages/testimonial.jpg";

import { FaPaw, FaQuoteLeft } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router";

// Define the content for each tab
const tabs = [
  {
    id: "mission",
    label: "Our Mission",
    image: missionImage,
    title: "Your Pets Deserve the Best Care",
    content: [
      {
        heading: "Our Philosophy",
        text: "Our core philosophy is centered on providing compassionate, comprehensive, and state-of-the-art veterinary care. We believe every pet is a cherished family member and deserves to be treated with the utmost kindness and respect. We are dedicated to enhancing the human-animal bond through exceptional service and education.",
      },
      {
        heading: "Our Organization",
        text: "Founded in 2010, our clinic has grown into a leading pet care facility. Our team of certified veterinarians and passionate staff work tirelessly to create a welcoming and safe environment. We are equipped with modern technology to handle everything from routine check-ups to complex surgical procedures.",
      },
      {
        heading: "Our Vision for the Future",
        text: "We envision a world where every pet receives the care and love they deserve. As we grow, we're investing in community outreach, digital health tools, and partnerships that make pet care more accessible and transparent for all.",
      },
    ],
  },
  {
    id: "events",
    label: "Our Events",
    image: eventsImage,
    title: "Engaging With Our Community",
    content: [
      {
        heading: "Adoption Drives",
        text: "We partner with local shelters to host monthly adoption events. Our goal is to find loving forever homes for animals in need. These events are a wonderful opportunity for the community to meet adoptable pets and learn more about responsible pet ownership.",
      },
      {
        heading: "Free Workshops",
        text: "We offer free workshops on various pet care topics, including puppy training, senior pet care, and nutritional advice. These sessions are led by our expert staff and are designed to empower pet owners with the knowledge they need to provide the best care.",
      },
      {
        heading: "Seasonal Community Events",
        text: "From pet costume contests to holiday donation drives, we host engaging seasonal events that bring pet lovers together. These events not only celebrate our furry friends but also support local rescue efforts and animal welfare campaigns.",
      },
    ],
  },
  {
    id: "testimonials",
    label: "Testimonials",
    image: testimonialsImage,
    title: "What Our Clients Say",
    content: [
      {
        heading: 'Sarah & "Buddy"',
        text: '"The team here is incredible. They treated Buddy with so much love and professionalism during his surgery. We felt supported every step of the way. Highly recommend!"',
        icon: <FaQuoteLeft className="text-blue-200 text-2xl mr-4" />,
      },
      {
        heading: 'Mark & "Luna"',
        text: '"I\'ve been bringing Luna here for years for everything from check-ups to grooming. The staff is always friendly, knowledgeable, and genuinely cares about her well-being."',
        icon: <FaQuoteLeft className="text-blue-200 text-2xl mr-4" />,
      },
      {
        heading: 'Emily & "Shadow"',
        text: '"Shadow was a timid rescue, but this clinic made his first vet visit a breeze. The environment is calm and welcoming, and the vets take their time to make pets feel at ease."',
        icon: <FaQuoteLeft className="text-blue-200 text-2xl mr-4" />,
      },
    ],
  },
];

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div
      style={{ backgroundImage: `url(${aboutBg})` }}
      className="bg-no-repeat bg-center bg-cover py-16 sm:pb-24 relative"
    >
      <div className="absolute inset-0 bg-white/40 z-0"></div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">
            — GET TO KNOW US —
          </p>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">ABOUT US</h2>
          <div className="text-[#018AE0]/50 rotate-12 text-xl flex justify-center">
            <FaPaw />
          </div>
        </div>
        {/* tab button */}
        <div className="flex w-[40%] mx-auto flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-center font-semibold py-3 px-4 transition-colors duration-300 focus:outline-none relative ${
                activeTab === tab.id
                  ? "text-white"
                  : " hover:bg-[#D61C62] text-white bg-[#1446A0]"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-[#D61C62] "
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content Card */}
        <div className="max-w-6xl mx-auto bg-white shadow-2xl p-6 sm:px-10 sm:py-16 relative">
          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:flex-row gap-12 items-center"
            >
              {/* Left Column: Image */}
              <motion.div
                initial={{ rotate: -6 }}
                whileHover={{ rotate: 0, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="w-2/3 h-80 overflow-hidden relative p-2 bg-neutral-300 shadow-lg"
              >
                <img
                  src={activeTabData.image}
                  alt={activeTabData.title}
                  className="w-full h-full object-cover "
                />
              </motion.div>

              {/* Right Column: Text Content */}
              <div className="text-gray-700">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {activeTabData.title}
                </h3>
                <div className="space-y-4">
                  {activeTabData.content.map((item, index) => (
                    <div key={index} className="flex">
                      {item.icon && (
                        <div className="flex-shrink-0">{item.icon}</div>
                      )}
                      <div>
                        <h4 className="font-bold text-md text-[#1446A0]">
                          {item.heading}
                        </h4>
                        <p className="text-sm sm:text-base leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to={'/about'}>
                  <button className="mt-8 bg-[#018AE0] text-white px-8 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300 focus:outline-none">
                    MORE ABOUT US
                  </button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
