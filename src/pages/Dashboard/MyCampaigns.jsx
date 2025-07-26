import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Pause, Pencil, Play, Users2, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import loader from "../../../public/loader.json";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion"; //eslint-disable-line

const backdropVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const MyCampaigns = () => {
  const { user } = useContext(AuthContext);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedDonators, setSelectedDonators] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const { register, handleSubmit } = useForm();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["myCampaign"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`donation/email?email=${user?.email}`);
      return res.data;
    },
  });
  useEffect(() => {
    if (data) {
      setCampaigns(data);
    }
  }, [data]);

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-52">
          <Lottie animationData={loader} loop={true}></Lottie>
        </div>
      </div>
    );

  const handlePauseToggle = async (id, currentStatus) => {
    try {
      await axiosSecure.patch(`/donation/${id}`, {
        paused: !currentStatus,
      });
      setCampaigns((prev) =>
        prev.map((c) => (c._id === id ? { ...c, paused: !currentStatus } : c))
      );
    } catch (err) {
      console.error("Pause toggle failed", err);
    }
  };

  //edit
  const onSubmit = async (data) => {
    try {
      await axiosSecure.put(`/donation/${selectedCampaign._id}`, {
        ...data,
      });

      setCampaigns((prev) =>
        prev.map((c) =>
          c._id === selectedCampaign._id ? { ...c, ...data } : c
        )
      );

      setShowEditModal(false);
      setSelectedCampaign(null);
      refetch();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleViewDonators = (donators) => {
    setSelectedDonators(donators || []);
    setShowModal(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {campaigns.length > 0? (
        <>
        <h2 className="text-2xl font-bold mb-6 text-[#1446A0] text-center">
        My Donation Campaigns
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border bg-white border-gray-300 text-sm md:text-base">
          <thead className="bg-[#1446A0] text-white">
            <tr>
              <th className="p-3 ">Pet Name</th>
              <th className="p-3 ">Max Donation</th>
              <th className="p-3 ">Progress</th>
              <th className="p-3 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => {
              const progress = Math.min(
                (c.totalDonated / c.maxDonation) * 100,
                100
              );

              return (
                <tr
                  key={c._id}
                  className="text-center border-b hover:bg-gray-50 transition"
                >
                  <td className="p-2 ">{c.petName}</td>
                  <td className="p-2 ">৳{c.maxDonation.toFixed(2)}</td>
                  <td className="p-2  w-64">
                    <div className="bg-gray-200 h-4 rounded-full">
                      <div
                        className="h-4 bg-[#0d9488] rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <small>
                      {c.totalDonated.toFixed(2)} / {c.maxDonation.toFixed(2)}
                    </small>
                  </td>
                  <td className="p-5  space-x-2 flex justify-center">
                    <button
                      onClick={() => handlePauseToggle(c._id, c.paused)}
                      className={`p-2 rounded-full text-white cursor-pointer ${
                        c.paused ? "bg-yellow-500" : "bg-[#D61C62]"
                      }`}
                      title={c.paused ? "Unpause" : "Pause"}
                    >
                      {c.paused ? <Play size={18} /> : <Pause size={18} />}
                    </button>

                    <button
                      onClick={() => {
                        setSelectedCampaign(c);
                        setShowEditModal(true);
                      }}
                      className="p-2 bg-[#018AE0] rounded-full text-white cursor-pointer"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleViewDonators(c.donators)}
                      className="p-2 bg-[#0d9488] rounded-full text-white cursor-pointer"
                      title="View Donators"
                    >
                      <Users2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
        </>
      ) : (<div>
        <h1>No Campaigns Added</h1>
      </div>)
      }

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

      {/* donors */}
      {showModal && (
        <AnimatePresence>
          {showModal && (
            <motion.div
              variants={backdropVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-4"
            >
              <div className="bg-white rounded-lg max-w-lg w-full p-6 relative">
                <button
                  className="absolute top-2 right-2 text-xl text-gray-500"
                  onClick={() => setShowModal(false)}
                >
                  <X />
                </button>
                <h3 className="text-xl font-semibold mb-4">Donators</h3>
                {selectedDonators.length === 0 ? (
                  <p>No donators yet.</p>
                ) : (
                  <ul className="space-y-3">
                    {selectedDonators.map((donator, index) => (
                      <li key={index} className="border-b pb-2 border-gray-200">
                        <p>
                          <strong>Email:</strong> {donator.email}
                        </p>
                        <p>
                          <strong>Amount:</strong> ৳{donator.donatedAmount}
                        </p>
                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(donator.date).toLocaleString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default MyCampaigns;
