import React from "react";
import PageHeading from "../components/reuseable/pageHeadinng";
import aboutPet from "../assets/about-img.png";
import CountBar from "../components/CountBar";
import { Link } from "react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageTitle from "../hooks/PageTitle.";

const About = () => {
  return (
    <div>
      <PageTitle title={'About - United Pets'}></PageTitle>
      <PageHeading
        title={"About Us"}
        breadcrumb={[
          { label: "Home", link: "/" },
          { label: "About", link: "/about", active: true },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center mt-16 px-6 md:px-12 lg:px-32 gap-12">
        <div className="order-1 lg:order-none">
          <img
            src={aboutPet}
            alt="About PetConnect"
            className="w-full max-w-md mx-auto lg:mx-0"
          />
        </div>
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold mb-4">Our Mission</h1>
          <p className="mb-6 text-gray-700 md:text-lg">
            At PetConnect, our mission is to create a compassionate community
            where pets and people thrive together. We aim to make pet adoption,
            care, and services more accessible and trustworthy through
            technology, empowering pet lovers with reliable resources and a
            platform to connect with others.
          </p>

          <h1 className="text-2xl font-semibold mb-4">
            We have over 20 years of experience
          </h1>
          <p className="text-gray-700 mb-6 md:text-lg">
            With over two decades of hands-on experience in pet care and animal
            welfare, our team is committed to providing trusted services for pet
            lovers and adopters. We've worked with countless shelters,
            veterinarians, and pet owners to build a platform that prioritizes
            safety, compassion, and the well-being of every animal.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link to={"/contact"}>
              <button className="px-10 py-2 rounded-full bg-[#D61C62] text-white font-bold">
                Contact Us
              </button>
            </Link>
            <Link to={"/services"}>
              <button className="px-10 py-2 rounded-full bg-[#018AE0] text-white font-bold">
                Our Services
              </button>
            </Link>
          </div>
        </div>
      </div>

      <CountBar />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-4/5 mx-auto my-16">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-800">
            More About Us
          </h2>
          <p className="text-lg text-gray-500">
            Your pet's health and happiness are our top priority. We provide
            comprehensive, compassionate, and high-quality veterinary services
            for cats and dogs across Bangladesh.
          </p>
          <hr className="border-t border-gray-200" />
          <div className="text-gray-600 space-y-4">
            <p>
              Our clinic was founded on the principle of providing exceptional
              care in a friendly and welcoming environment. Our team of
              experienced veterinarians and dedicated staff are committed to
              treating every pet as if they were our own. We utilize modern
              medical techniques and state-of-the-art equipment to ensure the
              best possible outcomes.
            </p>
            <p>
              From routine check-ups and vaccinations to advanced diagnostics
              and surgical procedures, we offer a complete range of services. We
              believe in educating our clients, helping you make informed
              decisions about your pet’s health, nutrition, and overall
              well-being.
            </p>
          </div>
        </div>
        <div className="w-full">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className='text-[#1446A0] text-xl font-bold'>Our Philosophy</AccordionTrigger>
              <AccordionContent>
                Our core philosophy is simple: provide outstanding medical care
                with compassion and respect for both pets and their owners. We
                strive to create a stress-free experience and build lasting
                relationships based on trust and mutual love for animals.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className='text-[#1446A0] text-xl font-bold'>Our Organization</AccordionTrigger>
              <AccordionContent>
                Since our establishment, we have become a trusted name in pet
                healthcare in Dhaka. Our growth is a testament to our unwavering
                commitment to excellence and the strong bonds we've built within
                the community. We are proud to be a locally owned and operated
                clinic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className='text-[#1446A0] text-xl font-bold'>Partnerships with our Team</AccordionTrigger>
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

export default About;
