import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AnimatePresence, motion } from "framer-motion"; //eslint-disable-line
import { X } from "lucide-react";
import { useForm } from "react-hook-form";

const AllDonations = () => {
  const axiosSecure = useAxiosSecure();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const {handleSubmit, register} = useForm()

  const backdropVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const { data: campaigns = [], refetch } = useQuery({
    queryKey: ["all-donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donation");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the campaign!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/donation-delete/${id}`);
      Swal.fire("Deleted!", "Campaign has been deleted.", "success");
      refetch();
    }
  };

  const handleTogglePause = async (id, isPaused) => {
    await axiosSecure.patch(`/donation-status/${id}`, {
      paused: !isPaused,
    });
    Swal.fire(
      "Updated!",
      `Campaign ${isPaused ? "unpaused" : "paused"}.`,
      "success"
    );
    refetch();
  };

  //edit
  const onSubmit = async (data) => {
    try {
      await axiosSecure.put(`/donation-edit/${selectedCampaign._id}`, {
        ...data,
      });

      setShowEditModal(false);
      setSelectedCampaign(null);
      refetch();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-semibold text-[#018AE0] mb-4">
        All Donation Campaigns
      </h2>

      {campaigns.length === 0 ? (
        <p className="text-gray-600">No donation campaigns found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-white shadow-md overflow-hidden">
            <thead className="bg-[#018AE0] border-b text-white">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Pet</th>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Goal (৳)</th>
                <th className="px-4 py-3 text-left">Last Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign, index) => (
                <tr key={campaign._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{campaign.petName || "Unknown"}</td>
                  <td className="px-4 py-2">
                    <img
                      src={campaign.petImage || "/placeholder.png"}
                      alt={campaign.petName}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 font-medium text-[#018AE0]">
                    ৳{campaign.maxDonation?.toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(campaign.lastDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        campaign.paused
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {campaign.paused ? "Paused" : "Active"}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => {
                        setSelectedCampaign(campaign);
                        setShowEditModal(true);
                      }}
                      className="bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 py-1 text-sm rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleTogglePause(campaign._id, campaign.paused)
                      }
                      className={`px-3 py-1 text-sm rounded ${
                        campaign.paused
                          ? "bg-green-100 text-green-600 hover:bg-green-200"
                          : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                      }`}
                    >
                      {campaign.paused ? "Unpause" : "Pause"}
                    </button>
                    <button
                      onClick={() => handleDelete(campaign._id)}
                      className="bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 text-sm rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* edit Modal */}
      {showEditModal && selectedCampaign && (
        <AnimatePresence>
          <motion.div
            variants={backdropVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            aria-hidden="true"
            className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-4"
          >
            <div className="bg-white rounded-lg max-w-xl w-full p-6 relative">
              <button
                className="absolute top-2 right-2 text-xl text-gray-500"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedCampaign(null);
                }}
              >
                <X></X>
              </button>
              <h3 className="text-xl font-semibold mb-4 text-[#018AE0]">
                Edit Campaign
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block font-medium">Pet Image</label>
                  <input
                    {...register("petImage", { required: true })}
                    defaultValue={selectedCampaign.petImage}
                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                  />
                </div>

                <div>
                  <label className="block font-medium">Pet Name</label>
                  <input
                    {...register("petName", { required: true })}
                    defaultValue={selectedCampaign.petName}
                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                  />
                </div>

                <div>
                  <label className="block font-medium">Pet Category</label>
                  <input
                    {...register("petCategory", { required: true })}
                    defaultValue={selectedCampaign.petCategory}
                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                  />
                </div>

                <div>
                  <label className="block font-medium">Last Date</label>
                  <input
                    {...register("lastDate", { required: true })}
                    type="date"
                    defaultValue={selectedCampaign.lastDate?.slice(0, 10)}
                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                  />
                </div>

                <div>
                  <label className="block font-medium">Max Donation (৳)</label>
                  <input
                    {...register("maxDonation", {
                      required: true,
                      valueAsNumber: true,
                    })}
                    type="number"
                    step="0.01"
                    defaultValue={selectedCampaign.maxDonation}
                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                  />
                </div>

                <div>
                  <label className="block font-medium">Short Description</label>
                  <input
                    {...register("shortDescription", { required: true })}
                    defaultValue={selectedCampaign.shortDescription}
                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                  />
                </div>

                <div>
                  <label className="block font-medium">Long Description</label>
                  <textarea
                    {...register("longDescription", { required: true })}
                    defaultValue={selectedCampaign.longDescription}
                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#018AE0] text-white px-4 py-2 rounded hover:bg-[#0562a3]"
                >
                  Update Campaign
                </button>
              </form>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default AllDonations;
