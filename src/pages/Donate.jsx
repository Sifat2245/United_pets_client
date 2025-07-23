import React from "react";
import PageHeading from "../components/reuseable/pageHeadinng";
import PageTitle from "../hooks/PageTitle.";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import loader from '../../public/loader.json'
import DonationCard from "../components/DonationCard";

const Donate = () => {

    const axiosSecure = useAxiosSecure()

    const {data: donations = [], isLoading} = useQuery({
        queryKey: ['donation'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/donations')
            return res.data
        }
    })

    console.log(donations);


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
      <PageTitle title={"Donate - United Pets"}></PageTitle>
      <PageHeading
        title={"Donate"}
        breadcrumb={[
          { label: "Home", link: "/" },
          { label: "Donate", link: "/donate", active: true },
        ]}
      ></PageHeading>

      <div className="my-24">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl font-bold">
            Donate for <span className="text-[#D61C62]">rescued pets</span>
          </h1>
          <p className="mt-4 text-md ">
            Help us provide shelter, food, and love to animals in need. Your
            support makes a life-changing impact.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-4/5 mx-auto mb-24">
            {
                donations.map(donation => <DonationCard key={donation._id} donation={donation}></DonationCard>)
            }
      </div>
    </div>
  );
};

export default Donate;
