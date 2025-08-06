import React, { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import loader from "../../../public/loader.json";
import toast from "react-hot-toast";

const MyAdoption = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: adoptions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-adoptions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-adoption?email=${user.email}`);
      return res.data;
    },
  });

  const handleCancelRequest = async (id) => {
    try {
      await axiosSecure.delete(`adoptionRequest/${id}`);
      toast.success("Adoption request canceled");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel request");
    }
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
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Adoption Requests</h2>
      {adoptions.length === 0 ? (
        <p className="text-gray-500">No adoption requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full  bg-white border-gray-400 border">
            <thead className="bg-[#018AE0] text-white border-b">
              <tr className="">
                <th className="py-2 px-4 ">#</th>
                <th className="py-2 px-4 ">Pet Image</th>
                <th className="py-2 px-4 ">Pet Name</th>
                <th className="py-2 px-4 ">Pet Owner</th>
                <th className="py-2 px-4 ">Status</th>
                <th className="py-2 px-4 ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adoptions.map((request, index) => (
                <tr key={request._id} className="text-center border-b">
                  <td className="py-2 px-4 ">{index + 1}</td>
                  <td className="py-2 px-4  flex items-center justify-center gap-2">
                    <img
                      src={request.petImage}
                      alt={request.petName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4 ">{request.petName}</td>
                  <td className="py-2 px-4 ">{request.addedBy}</td>
                  <td className="py-2 px-4 ">{request.status}</td>
                  <td className="py-2 px-4 ">
                    <button
                      onClick={() => handleCancelRequest(request._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded hover:cursor-pointer"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAdoption;
