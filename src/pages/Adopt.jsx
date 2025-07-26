import React from "react";
import PageHeading from "../components/reuseable/pageHeadinng";
import { FaCheckSquare } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PetCard from "../components/PetCard";
import PageTitle from "../hooks/PageTitle.";
import Lottie from "lottie-react";
import loader from '../../public/loader.json'
import { useNavigation } from "react-router";

const adoptionFeatures = [
  "All pets are neutered and vaccinated.",
  "All pets are examined by a vet and treated as required.",
  "We help to match you with a pet that meets your needs.",
];

const Adopt = () => {
  const axiosSecure = useAxiosSecure();
  const navigation = useNavigation()

  const { data: pets = [], isLoading } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pets/not-adopted");
      return res.data;
    },
  });

  const loading = isLoading || navigation.state === 'loading'

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-52">
          <Lottie animationData={loader} loop={true}></Lottie>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageTitle title={"Adopt - United Pets"}></PageTitle>
      <PageHeading
        title="Adoption"
        breadcrumb={[
          { label: "Home", link: "/" },
          { label: "Adopt", link: "/adopt", active: true },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-2/3 mx-auto my-24">
        <div className="text-gray-700">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">Adopt a Pet</h2>
          <p className="text-sm md:text-md leading-relaxed mb-4">
            Choosing to adopt a pet is a life-changing decision that brings
            immense joy and companionship. By adopting, you are giving a
            deserving animal a second chance at a happy life in a loving forever
            home. Our team is dedicated to making the adoption process smooth,
            transparent, and rewarding for both you and your new furry friend.
          </p>
          <p className="text-md">
            If you have any doubts or need more information, please{" "}
            <a
              href="/contact"
              className="text-[#018AE0] font-semibold hover:underline"
            >
              contact us
            </a>
            .
          </p>
        </div>

        <div className="bg-gray-100 p-8 rounded-lg shadow-md">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
            Ready for adoption
          </h3>
          <div className="space-y-4">
            {adoptionFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <FaCheckSquare className="text-[#D61C62] text-md md:text-lg mt-1 flex-shrink-0" />
                <span className="text-gray-700 text-sm md:text-md">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 my-24 w-4/5 mx-auto">
        {pets.map((pet) => (
          <PetCard key={pet._id} pet={pet}></PetCard>
        ))}
      </div>
    </div>
  );
};

export default Adopt;
