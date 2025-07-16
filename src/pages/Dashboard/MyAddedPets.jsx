import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../context/AuthContext";
import { Pencil, Trash2, Heart } from "lucide-react";

const MyAddedPets = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data = { pets: [], total: 0},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pets", user?.email, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
      `/pets/email?email=${user?.email}&page=${currentPage}&limit=${itemsPerPage}`
    );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const totalPets = data.total;
  const totalPages = Math.ceil(totalPets / itemsPerPage);
  const currentPets = data.pets; 

  if (isLoading)
    return <p className="text-center py-10">Loading your pets...</p>;
  if (isError)
    return (
      <p className="text-center text-red-600 py-10">Error: {error.message}</p>
    );
  if (data.pets.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500">No pets added yet.</p>
    );

  return (
    <div className="overflow-x-auto mt-10 px-4">
      <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
        <thead className="bg-[#018AE0] text-white text-sm uppercase tracking-wide">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Age</th>
            <th className="py-3 px-4 text-left">Gender</th>
            <th className="py-3 px-4 text-left">Category</th>
            <th className="py-3 px-4 text-left">Location</th>
            <th className="py-3 px-4 text-left">Added Time</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {currentPets.map(
            ({
              _id,
              name,
              age,
              gender,
              category,
              location,
              addedTime,
              adoptionStatus,
            }) => {
              const formattedTime = new Date(addedTime).toLocaleString(
                "en-US",
                {
                  dateStyle: "medium",
                  timeStyle: "short",
                }
              );

              return (
                <tr
                  key={_id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium">{name}</td>
                  <td className="py-3 px-4">{age} yr</td>
                  <td className="py-3 px-4 capitalize">{gender}</td>
                  <td className="py-3 px-4 capitalize">{category}</td>
                  <td className="py-3 px-4">{location}</td>
                  <td className="py-3 px-4">{formattedTime}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        adoptionStatus === "Adopted"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {adoptionStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    <button className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded">
                      <Pencil size={14} /> Edit
                    </button>
                    <button className="inline-flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded">
                      <Trash2 size={14} /> Delete
                    </button>
                    {adoptionStatus !== "Adopted" && (
                      <button className="inline-flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded">
                        <Heart size={14} /> Adopt
                      </button>
                    )}
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>
          {[...Array(totalPages).keys()].map((num) => {
            const page = num + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded ${
                  page === currentPage
                    ? "bg-[#018AE0] text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyAddedPets;
