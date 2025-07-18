import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPaw, FaPhoneAlt } from "react-icons/fa";
import contactCat from "../assets/contactbg1.png";
import { MessageCircleMore } from "lucide-react";


const Contact = () => {
  return (
    <div className="mb-24" id="contact">
      <div className="text-center mb-24">
        <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">
          — GET IN TOUCH —
        </p>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">CONTACT US</h2>
        <div className="text-[#018AE0]/50 rotate-12 text-xl flex justify-center">
          <FaPaw />
        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-center gap-8 lg:pl-62 relative">
        <div className="hidden lg:block flex-shrink-0 absolute -left-20 -top-6 z-10">
          <img src={contactCat} alt="Cat peeking" className="h-[870px]" />
        </div>

        <div
          className="w-full max-w-lg bg-[#018AE0] text-white py-8 px-4 rounded-lg relative z-10"
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#018AE0] p-6 rounded-full">
            <FaEnvelope className="text-3xl text-white" />
          </div>

          <h3 className="text-2xl font-bold text-center my-10">
            Send us a message
          </h3>
          <form>
            <div className="mb-8">
              <label htmlFor="name" className="block mb-1 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full bg-transparent border-b-2 border-white/50 focus:border-[#D61C62] hover:border-[#D61C62] outline-none transition-colors"
              />
            </div>
            <div className="mb-8">
              <label htmlFor="email" className="block mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-transparent border-b-2 border-white/50 focus:border-[#D61C62] hover:border-[#D61C62] outline-none transition-colors"
              />
            </div>
            <div className="mb-8">
              <label htmlFor="subject" className="block mb-1 font-medium">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full bg-transparent border-b-2 border-white/50 focus:border-[#D61C62] hover:border-[#D61C62] outline-none transition-colors"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block mb-1 font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows="3"
                className="w-full bg-transparent border-b-2 border-white/50 focus:border-[#D61C62] hover:border-[#D61C62] outline-none transition-colors"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#D61C62] text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>

        {/* Right: Contact Info & Map */}
        <div className="w-3/4 lg:w-1/3 text-gray-700">
          <h3 className="text-2xl font-bold mb-4">
            Get in Touch with developer
          </h3>
          <p className="mb-6 text-gray-600">
            We're here to help! Whether you have a question about our services
            or need expert advice, feel free to reach out.
          </p>
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-[#D61C62]" />
              <a
                href="mailto:mdsaifuddinahmed360@gmail.com"
                className="hover:text-[#018AE0]"
              >
                mdsaifuddinahmed360@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircleMore className="text-[#D61C62]" />
              <a
                href="whatsapp:+8801903321075"
                className="hover:text-[#018AE0]"
              >
                (+880) 1903-321075
              </a>
            </div>
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-[#D61C62] mt-1" />
              <span>Narayanganj - Bangladesh</span>
            </div>
          </div>

          <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.540688837939!2d90.50030387525568!3d23.801358678632804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b1315e9d4e9f%3A0xc1903e7d79d9022c!2sNarayanganj!5e0!3m2!1sen!2sbd!4v1721217813546!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location of Narayanganj"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
