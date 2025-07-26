import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    const profileData = {
      name: user?.displayName,
      email: user?.email,
      phone,
      address,
    };
    console.log('Profile Updated:', profileData);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-[#018AE0]">My Profile</h2>

      <div className="flex items-center gap-4 mb-6">
        <img
          src={user?.photoURL || '/default-avatar.png'}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <p className="text-lg font-semibold">{user?.displayName || 'Anonymous'}</p>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium mb-1 text-gray-700">Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#018AE0]"
            placeholder="Enter your phone number"
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-gray-700">Address</label>
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
          className="bg-[#018AE0] text-white px-6 py-2 rounded hover:bg-[#0167a1] transition duration-200"
        >
          Save Info
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
