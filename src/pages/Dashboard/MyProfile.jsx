import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

   useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get(`/user/email/${user?.email}`);
        if (res.data) {
          setPhone(res.data.phone || "");
          setAddress(res.data.address || "");
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, [user?.email, axiosSecure]);

  // Upload to Cloudinary
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "user_profile_image");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_Cloudinary_cloudname
      }/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  // Update Profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    
    try {
      let uploadedImageUrl = user?.photoURL || "";
  
      if (imageFile) {
        uploadedImageUrl = await handleImageUpload(imageFile);
      }
  
      const profileData = {
        name,
        email: user?.email,
        phone,
        address,
        photoURL: uploadedImageUrl,
      };
  
      await updateUser({ displayName: name, photoURL: uploadedImageUrl });

      const res = await axiosSecure.patch(`/users/${user?.email}`, profileData);
      console.log("Profile updated:", res.data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-[#018AE0]">My Profile</h2>

      <div className="flex items-center gap-4 mb-6">
        <img
          src={
            imageFile
              ? URL.createObjectURL(imageFile) // preview selected file
              : user?.photoURL || "/default-avatar.png"
          }
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <p className="text-lg font-semibold">{name || "Anonymous"}</p>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium mb-1 text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#018AE0]"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#018AE0]"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Address
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#018AE0]"
            placeholder="Enter your address"
            rows={3}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#018AE0] text-white px-6 py-2 rounded hover:bg-[#0167a1] transition duration-200"
        >
          {loading ? "Saving..." : "Save Info"}
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
