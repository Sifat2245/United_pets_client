import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../context/AuthContext";

const CreateCampaign = () => {
  const [uploading, setUploading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);

  const imageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "Donation-image");
    formData.append(
      "cloud_name",
      `${import.meta.env.VITE_Cloudinary_cloudname}`
    );

    try {
      setUploading(true);
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_Cloudinary_cloudname
        }/image/upload`,
        formData
      );
      setUploading(false);
      return res.data.secure_url;
    } catch (err) {
      setUploading(false);
      toast.error("Image upload failed.", err);
      return null;
    }
  };

  const onSubmit = async (data) => {
    const imageUrl = await imageUpload(data.petImage[0]);
    if (!imageUrl) return;

    const campaignData = {
      petName: data.petName,
      petImage: imageUrl,
      addedBy: user?.email,
      maxDonation: parseInt(data.maxDonation),
      lastDate: data.lastDate,
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      createdAt: new Date().toISOString(),
      paused: false,
      donators: [],
      totalDonated: 0,
      fulfilled: false, 
    };

    try {
      await axiosSecure.post("/donations", campaignData);
      toast.success("Donation campaign created!");
      reset();
    } catch (error) {
      toast.error("Failed to create campaign.", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-xl shadow-md mt-8 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#018AE0]">
        Create Donation Campaign
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Pet Image */}
        <div>
          <label className="block mb-1 font-semibold">Pet Picture</label>
          <input
            type="file"
            {...register("petImage", { required: "Pet image is required" })}
            accept="image/*"
            className="block w-full p-2 border border-gray-300 rounded"
          />
          {errors.petImage && (
            <p className="text-red-500 text-sm">{errors.petImage.message}</p>
          )}
        </div>

        {/* pet name */}
        <div>
          <label className="block mb-1 font-semibold">Pet Name</label>
          <input
            type="text"
            {...register("petName", { required: "Pet Name is required" })}
            className="block w-full p-2 border border-gray-300 rounded"
          />
          {errors.shortDescription && (
            <p className="text-red-500 text-sm">{errors.petName.message}</p>
          )}
        </div>

        {/* Maximum Donation */}
        <div>
          <label className="block mb-1 font-semibold">
            Maximum Donation Amount (৳)
          </label>
          <input
            type="number"
            step="0.01"
            {...register("maxDonation", {
              required: "Maximum amount is required",
            })}
            className="block w-full p-2 border border-gray-300 rounded"
          />
          {errors.maxDonation && (
            <p className="text-red-500 text-sm">{errors.maxDonation.message}</p>
          )}
        </div>

        {/* Last Date */}
        <div>
          <label className="block mb-1 font-semibold">
            Last Date of Donation
          </label>
          <input
            type="date"
            {...register("lastDate", { required: "Last date is required" })}
            className="block w-full p-2 border border-gray-300 rounded"
          />
          {errors.lastDate && (
            <p className="text-red-500 text-sm">{errors.lastDate.message}</p>
          )}
        </div>

        {/* Short Description */}
        <div>
          <label className="block mb-1 font-semibold">Short Description</label>
          <input
            type="text"
            {...register("shortDescription", {
              required: "Short description is required",
            })}
            className="block w-full p-2 border border-gray-300 rounded"
          />
          {errors.shortDescription && (
            <p className="text-red-500 text-sm">
              {errors.shortDescription.message}
            </p>
          )}
        </div>

        {/* Long Description */}
        <div>
          <label className="block mb-1 font-semibold">Long Description</label>
          <textarea
            {...register("longDescription", {
              required: "Long description is required",
            })}
            rows={5}
            className="block w-full p-2 border border-gray-300 rounded"
          ></textarea>
          {errors.longDescription && (
            <p className="text-red-500 text-sm">
              {errors.longDescription.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            disabled={uploading}
            className="bg-[#018AE0] text-white px-6 py-2 rounded hover:bg-[#018AE0]/70 transition-all disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Create Campaign"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
