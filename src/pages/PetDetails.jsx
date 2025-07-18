import React from "react";
import { useLoaderData } from "react-router";
import PageHeading from "../components/reuseable/pageHeadinng";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import bgImg from "../assets/pattern1.png";
import { CalendarDays, MapPin } from "lucide-react";
import dogImg from "../assets/adoptionsidebar1.jpg";
import PageTitle from "../hooks/PageTitle.";

const PetDetails = () => {
  const {
    _id,
    image,
    name,
    age,
    breed,
    location,
    category,
    gender,
    vaccinated,
    shortDescription,
    longDescription,
  } = useLoaderData();

  return (
    <div>
        <PageTitle title={`${name} - United Pets`}></PageTitle>
      <PageHeading
        title={"Pet Details"}
        breadcrumb={[
          { label: "Home", link: "/" },
          { label: "Adopt", link: "/adopt" },
          { label: "Pet Details", link: "/pet-details/:id", active: true },
        ]}
      ></PageHeading>

      <div className="w-2/3 mx-auto my-26 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[170%]">
          <div className="flex flex-col lg:flex-row gap-10">
            <div>
              <img src={image} className="aspect-square w-96" alt="" />
            </div>
            <div className="w-full space-y-3">
              <h1 className="text-3xl font-bold mb-4">{name}</h1>
              <p className="mb-6">{shortDescription}</p>
              <div className="border-b border-dashed w-full">
                <p>
                  <span className="font-semibold">Gender: </span>
                  {gender}
                </p>
              </div>
              <div className="border-b border-dashed w-full">
                <p>
                  <span className="font-semibold">Age: </span>
                  {age} Years
                </p>
              </div>
              <div className="border-b border-dashed w-full">
                <p>
                  <span className="font-semibold">Breed: </span>
                  {breed}
                </p>
              </div>
              <div className="border-b border-dashed w-full">
                <p>
                  <span className="font-semibold">Vaccinated: </span>
                  {vaccinated}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 mb-10">
            <h1 className="text-4xl font-bold mb-5">About Me</h1>
            <p className="mb-4">{longDescription}</p>
            <p className="font-semibold">
              If you have any doubts or need more information, please{" "}
              <a href="/contact" className="text-[#018AE0]">
                contact us
              </a>
            </p>
          </div>

          <div className="mb-16">
            <button className="px-12 py-2 rounded-full bg-[#D61C62] hover:bg-[#018AE0] transition-all duration-300 cursor-pointer text-white font-bold">
              Adopt Me
            </button>
          </div>

          <div className="mb-14">
            <h1 className="text-2xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-[#1446A0] text-lg font-bold">
                  What documents do I need to adopt a pet?
                </AccordionTrigger>
                <AccordionContent>
                  To adopt a pet, you typically need a valid photo ID (such as a
                  National ID or Passport), proof of residence, and in some
                  cases, a completed adoption application. Some shelters may
                  also require references or proof that pets are allowed in your
                  residence if you rent.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-[#1446A0] text-lg font-bold">
                  Are the animals vaccinated?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, all animals available for adoption are vaccinated
                  according to their age and health condition. They receive
                  essential vaccines like rabies, parvovirus, and distemper.
                  You’ll receive a vaccination record and health report at the
                  time of adoption.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-[#1446A0] text-lg font-bold">
                  How much is the adoption fee?
                </AccordionTrigger>
                <AccordionContent>
                  The adoption fee typically ranges from ৳500 to ৳2000 depending
                  on the animal and organization. This fee helps cover basic
                  medical expenses such as vaccinations, deworming, and
                  sometimes spaying/neutering. It also ensures the pet is
                  healthy and ready for a new home.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="p-8 bg-red-100">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Important Information for Future Pet Owners
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Adopting a pet is a lifelong commitment and a deeply rewarding
              experience. Before you bring a new furry friend into your home,
              make sure you’re prepared to meet their emotional and physical
              needs. This includes providing proper nutrition, routine
              veterinary care, regular exercise, and lots of love and attention.
            </p>
            <br />
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              It's also essential to consider your living situation, lifestyle,
              and long-term plans. Pets thrive in stable environments where they
              feel safe and cared for. If you're adopting a dog, make time for
              walks and playtime. If it's a cat, ensure they have a quiet,
              enriching space to explore.
            </p>
            <br />
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Remember, adoption saves lives. By adopting from a shelter or
              rescue organization, you're not only giving a loving home to a pet
              in need but also helping reduce the number of stray animals in our
              communities. Thank you for choosing to adopt!
            </p>
          </div>
        </div>

        <div>
          <aside className="w-full bg-neutral-100 rounded-2xl shadow-sm overflow-hidden">
            {/* Adoption Event */}
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-xl font-bold text-center mb-4">
                Adoption events
              </h2>
              <div className="bg-white rounded-xl overflow-hidden shadow">
                <div className="overflow-hidden rounded-t-xl">
                  <img
                    src={dogImg}
                    alt="Adoption Event"
                    className="w-full h-40 object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-4 space-y-2 text-sm">
                  <h3 className="font-semibold text-center text-lg text-gray-800">
                    NYC Adoption Fair
                  </h3>
                  <p className="flex items-center justify-center gap-1 text-gray-600">
                    <CalendarDays size={16} /> 2th February at 4pm
                  </p>
                  <p className="flex items-center justify-center gap-1 text-gray-600">
                    <MapPin size={16} /> Washington Square Park
                  </p>
                  <div className="text-center mt-3">
                    <button className="bg-[#018AE0] text-white font-semibold px-4 py-1.5 rounded-full text-sm hover:bg-[#1446A0] transition">
                      MORE INFO
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="px-5 py-6 text-center border-b border-gray-200">
              <h3 className="text-lg font-bold mb-2">Information</h3>
              <p className="text-sm text-gray-600">
                Thinking of adopting? Make sure your home and lifestyle are
                ready for a furry friend. We're here to help!
              </p>
            </div>

            {/* Adopt a Pet */}
            <div className="px-5 py-6">
              <h3 className="text-lg font-bold mb-4">Adopt a pet</h3>
              {/* <ul className="space-y-3">
              <li className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm">
                <img
                  src={cat1}
                  alt="Leelo"
                  className="w-10 h-10 object-cover rounded-md"
                />
                <span className="font-semibold text-[#D61C62]">Leelo</span>
              </li>
              <li className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm">
                <img
                  src={cat2}
                  alt="Jonsi"
                  className="w-10 h-10 object-cover rounded-md"
                />
                <span className="font-semibold text-[#018AE0]">Jonsi</span>
              </li>
              <li className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm">
                <img
                  src={dog2}
                  alt="Milena"
                  className="w-10 h-10 object-cover rounded-md"
                />
                <span className="font-semibold text-[#1446A0]">Milena</span>
              </li>
            </ul> */}
              <div className="text-center mt-5">
                <button className="bg-[#018AE0] text-white text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-[#1446A0] transition">
                  SEE ALL
                </button>
              </div>
            </div>

            {/* Background Pattern */}
            <div
              className="w-full h-20"
              style={{
                backgroundImage: `url(${bgImg})`,
                backgroundPosition: "center bottom",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
