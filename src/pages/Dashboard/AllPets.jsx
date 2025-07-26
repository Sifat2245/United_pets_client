import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import Lottie from "lottie-react";
import loader from "../../../public/loader.json";
import PetUpdateModal from "./PetUpdateModal";

const AllPets = () => {
  const axiosSecure = useAxiosSecure();
  const [editingPet, setEditingPet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: pets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allPets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pets");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this pet permanently?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/pets/${id}`);
      toast.success("Pet Deleted");
      refetch();
    }
  };

  const handleToggleAdoption = async (id, currentStatus) => {
    await axiosSecure.patch(`/pet/${id}`, {
      adoptionStatus: currentStatus === 'Adopted'? 'Not Adopted' : 'Adopted'
    });
    Swal.fire("Updated!", "Pet status updated.", "success");
    refetch();
  };


  const openEditModal = (pet) => {
    setEditingPet(pet);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingPet(null);
    setIsModalOpen(false);
  };

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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Pets</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border bg-white">
          <thead className="bg-[#018AE0] text-white">
            <tr>
              <th className="px-4 py-2">Pet Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Adopted</th>
              <th className="px-4 py-2">Added Time</th>
              <th className="px-4 py-2">Added By</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet._id} className="border-t">
                <td className="px-4 py-2">{pet.name}</td>
                <td className="px-4 py-2">{pet.category}</td>
                <td className="px-4 py-2">{pet.adoptionStatus}</td>
                <td className="px-4 py-2">
                  {new Date(pet.addedTime).toLocaleString()}
                </td>
                <td className="px-4 py-2">{pet.addedBy}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() =>
                      handleToggleAdoption(pet._id, pet.adoptionStatus)
                    }
                    className="text-blue-600 hover:text-blue-800"
                    title={
                      pet.adoptionStatus === "Not Adopted"
                        ? "Adopted"
                        : "Not Adopted"
                    }
                  >
                    {pet.adoptionStatus === "Adopted" ? (
                      <FaTimes />
                    ) : (
                      <FaCheck />
                    )}
                  </button>
                  <button
                    onClick={() => openEditModal(pet)}
                    className="text-yellow-600 hover:text-yellow-800"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(pet._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && editingPet && (
        <div className="fixed inset-0 z-50 bg-black/50 bg-opacity-50 flex items-center justify-center  ">
          <div className="bg-white rounded-lg max-h-[90vh] overflow-y-auto w-full max-w-4xl relative p-4">
            <button
              onClick={closeEditModal}
              className="absolute w-6 top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <PetUpdateModal
              pet={editingPet}
              onModalClose={closeEditModal}
              isModalOpen={isModalOpen}
              refetch={refetch}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPets;
