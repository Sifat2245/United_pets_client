import React from "react";
import PageHeading from "../components/reuseable/pageHeadinng";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";
import PageTitle from "../hooks/PageTitle.";

const Contact = () => {
  return (
    <div>
      <PageTitle title={'Contact - United Pets'}></PageTitle>
      <PageHeading
        title={"Contact Us"}
        breadcrumb={[
          { label: "Home", link: "/" },
          { label: "Contact", link: "/contact", active: true },
        ]}
      ></PageHeading>

      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <main className="space-y-12">
            {/* Contact Information Section */}
            <section>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Contact Information
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl">
                We're here to help and answer any question you might have. We
                look forward to hearing from you. Please feel free to get in
                touch via the form below, or contact us using the information
                provided.
              </p>
              <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                {/* Write Us Card */}
                <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                  <span className="bg-[#D61C62] text-white w-14 h-14 rounded-full inline-flex items-center justify-center text-3xl">
                    <FaEnvelope />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-gray-900">
                    Write us
                  </h3>
                  <a
                    href="mailto:mdsaifuddinahmed360@gmail.com
"
                    className="mt-2 text-sm text-gray-600 hover:text-primary transition"
                  >
                    mdsaifuddinahmed360@gmail.com

                  </a>
                </div>
                {/* Visit Us Card */}
                <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                  <span className="bg-[#D61C62] text-white w-14 h-14 rounded-full inline-flex items-center justify-center text-3xl">
                    <FaMapMarkerAlt />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-gray-900">
                    Visit us
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                   Narayanganj - Bangladesh
                  </p>
                </div>
                {/* Call Us Card */}
                <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                  <span className="bg-[#D61C62] text-white w-14 h-14 rounded-full inline-flex items-center justify-center text-3xl">
                    <FaPhoneAlt />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-gray-900">
                    Call us
                  </h3>
                  <a
                    href="whatsapp:+8801903321075"
                    className="mt-2 text-sm text-gray-600 hover:text-primary transition"
                  >
                    (+880) 1903-321075
                  </a>
                </div>
              </div>
            </section>

            {/* Send Message Form Section - UPDATED */}
            <section>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Send us a message
              </h2>
              <form className="mt-8 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-base font-medium text-gray-700 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="block w-full rounded-md border-2 border-[#D61C62] shadow-sm py-3 px-4 focus:ring-form-border focus:border-form-border"
                    />
                  </div>
                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-base font-medium text-gray-700 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="block w-full rounded-md border-2 border-[#D61C62] shadow-sm py-3 px-4 focus:ring-form-border focus:border-form-border"
                    />
                  </div>
                </div>
                {/* Subject Input */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-base font-medium text-gray-700 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="block w-full rounded-md border-2 border-[#D61C62] shadow-sm py-3 px-4 focus:ring-form-border focus:border-form-border"
                  />
                </div>
                {/* Message Textarea */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-base font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="8"
                    className="block w-full rounded-md border-2 border-[#D61C62] shadow-sm py-3 px-4 focus:ring-form-border focus:border-form-border"
                  ></textarea>
                </div>
                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-3 px-8 shadow-sm text-base font-semibold rounded-full text-white bg-[#018AE0] hover:bg-[#018AE0]/80 hover:cursor-pointer"
                  >
                    SEND MESSAGE
                  </button>
                </div>
              </form>
            </section>

            {/* Google Map Section */}
            <section className="w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117028.27969828873!2d90.4497138381283!3d23.60831114521639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b00000000001%3A0x804f762f6b8b1e4b!2sNarayanganj!5e0!3m2!1sen!2sbd!4v1721305488165!5m2!1sen!2sbd"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Narayanganj, Bangladesh Map"
              ></iframe>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Contact;
