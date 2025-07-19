import React, { use } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import loader from "../../../public/loader.json";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AdoptionRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);

  const {
    data: adoptionRequest = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["adoptionRequest"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/adoptionRequest?email=${user.email}`);
      return res.data;
    },
  });

  const handleUpdateStatus = async (id, status, petId) => {
    try {
      await axiosSecure.patch(`/adoptionRequest/${id}/status`, { status,  petId, });
      toast.success('Request Accepted Successfully')
      refetch();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleRejectStatus = async(id) =>{
    await axiosSecure.delete(`/adoptionRequest/${id}`)
    toast.success('Request Rejected Successfully')
    refetch()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-52">
          <Lottie animationData={loader} loop={true}></Lottie>
        </div>
      </div>
    );
  }

  if (adoptionRequest.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500">
        No adoption request found yet.
      </p>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Adoption Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-400 bg-white text-sm text-left">
          <thead className="border border-gray-400">
            <tr className="bg-[#D61C62] text-white">
              <th className=" px-4 py-2">Pet</th>
              <th className=" px-4 py-2">User</th>
              <th className=" px-4 py-2">Email</th>
              <th className=" px-4 py-2">Phone</th>
              <th className=" px-4 py-2">Address</th>
              <th className=" px-4 py-2">Status</th>
              <th className=" px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {adoptionRequest.map((req) => (
              <tr key={req._id}>
                <td className="px-4 py-2">{req.petName}</td>
                <td className="px-4 py-2">{req.userName}</td>
                <td className="px-4 py-2">{req.email}</td>
                <td className="px-4 py-2">{req.phone}</td>
                <td className="px-4 py-2">{req.address}</td>
                <td className="px-4 py-2 capitalize">{req.status}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleUpdateStatus(req._id, 'Accepted', req.petId)}
                    className="px-2 py-1 bg-[#018AE0] text-white rounded hover:bg-[#018AE0]/70 disabled:opacity-50"
                    disabled={req.status === "Accepted"}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRejectStatus(req._id)}
                    className="px-2 py-1 bg-[#D61C62] text-white rounded hover:bg-[#D61C62]/70 disabled:opacity-50"
                    disabled={req.status === "Rejected"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdoptionRequest;
