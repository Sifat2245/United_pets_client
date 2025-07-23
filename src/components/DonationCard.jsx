import React from "react";
import { Link } from "react-router";

const DonationCard = ({ donation }) => {
  const { _id, petName, petImage, maxDonation, totalDonated, shortDescription } =
    donation;

  const progressPercent = Math.min((totalDonated / maxDonation) * 100, 100);

  return (
    <div className="rounded-xl shadow-md bg-white overflow-hidden hover:shadow-lg transition duration-300">
      <div className="overflow-hidden h-60">
        <img
          src={petImage}
          alt={petName}
          className="w-full hover:scale-120 transition-all duration-300  object-cover"
        />
      </div>
      <div className="p-4">
        <Link to={`/donation-details/${_id}`}>
          <h3 className="text-xl font-semibold mb-2 hover:text-[#018AE0] cursor-pointer transition-all duration-300">
            {petName}
          </h3>
        </Link>
        <p className="text-md mb-2">{shortDescription}</p>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#D61C62] h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* Amounts */}
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>Raised: ৳{totalDonated}</span>
          <span>Goal: ৳{maxDonation}</span>
        </div>

        <Link to={`/donation-details/${_id}`}>
          <button className="hover:text-[#018AE0] cursor-pointer transition-all duration-300 mt-4 w-full">
            More Info
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DonationCard;
