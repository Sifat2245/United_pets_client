import React from "react";
import { useParams } from "react-router";
import PageTitle from "../hooks/PageTitle.";
import PageHeading from "../components/reuseable/pageHeadinng";
import { FaCheckSquare } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import PetCard from "../components/PetCard";
import Lottie from "lottie-react";
import loader from "../../public/loader.json";

const Category = () => {
  const { category } = useParams();
  const axiosInstance = useAxios();
  const adoptionFeatures = [
    "Verified pet health records",
    "Vaccination status provided",
    "Meet and greet opportunities",
    "Transparent adoption process",
    "Support after adoption",
  ];

  const { data: pets = [], isLoading } = useQuery({
    queryKey: ["pets", category],
    queryFn: async () => {
      const res = await axiosInstance.get(`/pet/${category}`);
      return res.data;
    },
  });

  console.log(pets);
  if (isLoading) {
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
      <PageTitle title={`${category} - United Pets`}></PageTitle>
      <PageHeading
        title="Category"
        breadcrumb={[
          { label: "Home", link: "/" },
          { label: "Category", link: `/category/${category}`, active: true },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-2/3 mx-auto my-24">
        <div className="text-gray-700">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            Adopt a {category}
          </h2>
          <p className="text-sm md:text-md leading-relaxed mb-4">
            Bringing a {category} into your life is a joyful and meaningful
            decision. By choosing adoption, you’re giving a loving companion a
            second chance at a happy home. Each of our {category}s has a unique
            personality and story, waiting to become part of your family.
          </p>
          <p className="text-md">
            If you’d like more information, please{" "}
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
            Why Adopt a {category}?
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 my-24 w-4/5 mx-auto">
        {pets.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No {category}s available for adoption.
          </p>
        ) : (
          pets.map((pet) => <PetCard key={pet._id} pet={pet} />)
        )}
      </div>
    </div>
  );
};

export default Category;
