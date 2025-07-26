import React, { use, useState } from "react";
import PageTitle from "../hooks/PageTitle.";
import PageHeading from "../components/reuseable/pageHeadinng";
import { useLoaderData } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import loader from "../../public/loader.json";
import useAxiosSecure from "../hooks/useAxiosSecure";
import DonationCard from "../components/DonationCard";
import Payment from "./Payment/Payment";
import { AuthContext } from "../context/AuthContext";
import { useModal } from "../context/ModalProvider";

const DonationDetails = () => {
  const donationData = useLoaderData();
  const {
    _id,
    petName,
    petImage,
    paused,
    petCategory,
    maxDonation,
    shortDescription,
    longDescription,
    lastDate,
    totalDonated = 0,
  } = donationData;
  const axiosSecure = useAxiosSecure();
  const {user} = use(AuthContext)
  const {openLoginModal} = useModal()

  const progress = Math.min((totalDonated / maxDonation) * 100, 100).toFixed(2);

  const [amount, setAmount] = useState("");

  const {
    data: recommended = [],
    isLoading,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation/category/${petCategory}?excludeId=${_id}`
      );
      return res.data;
    },
  });


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
      <PageTitle title={`${petName} - United Pets`} />
      <PageHeading
        title={"Pet Details"}
        breadcrumb={[
          { label: "Home", link: "/" },
          { label: "Donate", link: "/donate" },
          {
            label: "Donation Details",
            link: `/donation-details/${_id}`,
            active: true,
          },
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-start">
        {/* Image */}
        <img
          src={petImage}
          alt={petName}
          className="w-full rounded-xl shadow-lg"
        />

        {/* Info Section */}
        <div>
          <h2 className="text-3xl font-bold mb-2">{petName}</h2>
          <p className="text-muted-foreground mb-4">{shortDescription}</p>
          <p className="mb-4">{longDescription}</p>
          <p className="text-sm text-gray-500 mb-2">
            Target: ৳{maxDonation} | Donated: ৳{totalDonated}
          </p>

          <div>
            <div className="flex items-center justify-between mb-1 text-sm font-medium">
              <span>Donation Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mb-6">
              <div
                className="bg-[#D61C62] h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <Dialog>
            {
              user? (
                <DialogTrigger asChild>
              <Button
                disabled={paused}
                id="close-donation-modal"
                className="bg-pink-600 hover:bg-pink-700 text-white"
              >
                {paused ? "Campaign is Inactive right now" : "Donate Now"}
              </Button>
            </DialogTrigger>
              ):(
                <button onClick={openLoginModal} className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md">Login To Donate</button>
              )
            }

            <DialogContent className="max-w-lg space-y-4 bg-white">
              <DialogHeader>
                <DialogTitle>Donate to {petName}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <Label>Amount (৳)</Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="Enter amount"
                />

                {amount > 0 && (
                  <Payment
                    amount={amount}
                    donationId={_id}
                    petName= {petName}
                    petImage ={petImage}
                    petCategory= {petCategory}
                    onSuccess={() => {
                      setAmount("");
                      document.getElementById("close-donation-modal")?.click();
                    }}
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>

          {paused && (
            <p className="text-red-500 text-sm mt-4">
              This campaign is currently paused. Donations are temporarily
              disabled.
            </p>
          )}
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-16 space-y-10 px-4 text-gray-700 leading-relaxed mb-24">
        {/* Introduction */}
        <div>
          <h3 className="text-xl font-semibold text-[#018AE0] mb-2">
            Introduction
          </h3>
          <p>
            At <strong>United Pets</strong>, we believe every pet deserves a
            loving home and proper medical care. Whether it's rescuing a stray
            or supporting a pet in need of surgery, your donations directly
            impact the lives of these innocent animals. This campaign is a
            heartfelt call to support <strong>{petName}</strong>, a pet in
            urgent need of care and compassion.
          </p>
        </div>

        {/* Impact of the Cause */}
        <div>
          <h3 className="text-xl font-semibold text-[#018AE0] mb-2">
            Why Your Support Matters
          </h3>
          <p>
            Your donation goes beyond money — it gives hope. Contributions help
            cover medical treatment, shelter, food, and rehabilitation for pets
            like <strong>{petName}</strong>. Without your support, many pets
            would continue to suffer on the streets or be left untreated.
            Together, we can offer them a second chance.
          </p>
        </div>

        {/* How Your Donations Work */}
        <div>
          <h3 className="text-xl font-semibold text-[#018AE0] mb-2">
            How Your Donation Works
          </h3>
          <p>
            When you donate using our secure{" "}
            <strong>Stripe-powered payment system</strong>, the amount you
            choose goes directly to this pet’s care fund. Simply enter the
            amount, provide your card details, and submit. Stripe ensures that
            all transactions are <strong>safe, encrypted, and seamless</strong>.
          </p>
          <p className="mt-2">
            Once the donation is made, it will be instantly recorded, and the
            campaign creator will be able to see your contribution in their
            dashboard. This helps build trust and accountability, ensuring your
            money goes exactly where it's needed.
          </p>
        </div>

        {/* Transparency and Accountability */}
        <div>
          <h3 className="text-xl font-semibold text-[#018AE0] mb-2">
            Transparency & Accountability
          </h3>
          <p>
            We value your trust. That’s why all donations are{" "}
            <strong>logged and visible</strong> to the campaign initiator, and
            donors can track their impact. We don’t take platform fees from
            donations, and our system ensures that every penny reaches the
            intended cause.
          </p>
        </div>

        {/* Last Date Reminder */}
        <div>
          <h3 className="text-xl font-semibold text-[#018AE0] mb-2">
            Campaign Deadline
          </h3>
          <p>
            This campaign will end on{" "}
            <strong>{new Date(lastDate).toLocaleDateString()}</strong>. We
            encourage you to act swiftly — every moment matters in saving a
            life.
          </p>
        </div>

        {/* Thank You */}
        <div>
          <h3 className="text-xl font-semibold text-[#018AE0] mb-2">
            Thank You
          </h3>
          <p>
            Your kindness fuels our mission. Thank you for choosing to stand
            with <strong>United Pets</strong> and for being a voice for the
            voiceless. Together, we’re building a more compassionate world — one
            pet at a time.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mb-24">
        <h1 className="text-3xl font-bold mb-6">Recommended Campaigns</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {recommended.map((donation) => (
            <DonationCard key={donation._id} donation={donation}></DonationCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;
