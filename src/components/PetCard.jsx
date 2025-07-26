import Lottie from "lottie-react";
import { FaMapMarkerAlt, FaMars, FaVenus } from "react-icons/fa";
import { Link } from "react-router";

const PetCard = ({ pet }) => {
  const { _id ,image, name, age, gender, breed, location } = pet;

  return (
    <div className="bg-neutral-100 shadow-md hover:shadow-xl transition duration-300 overflow-hidden max-w-sm mx-auto">
      {/* Image */}
      <div className="h-80 w-full aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="p-5 space-y-2 text-gray-700">
        <h3 className="text-xl font-bold text-[#1446A0]">{name}</h3>

        <div className="flex justify-between text-sm">
          <span>
            Age: <span className="font-semibold">{age}</span>
          </span>
          <span className="flex items-center gap-1">
            Gender:{" "}
            <span className="font-semibold flex items-center gap-1 text-[#D61C62]">
              {gender === "Male" ? <FaMars /> : <FaVenus />}
              {gender}
            </span>
          </span>
        </div>

        <div className="text-sm">
          Breed: <span className="font-semibold">{breed}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600 gap-2">
          <FaMapMarkerAlt className="text-[#018AE0]" />
          <span>{location}</span>
        </div>

        <Link to={`/pet-details/${_id}`}>
          <button className="mt-3 bg-[#D61C62] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#b91752] transition duration-300">
            More Info
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
