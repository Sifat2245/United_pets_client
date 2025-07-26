import React, { useContext } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../context/AuthContext';
import Lottie from 'lottie-react';
import loader from '../../../public/loader.json';
import Swal from 'sweetalert2';

const MyDonations = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: donations = [], isLoading, refetch } = useQuery({
    queryKey: ['my-donations', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-donation/email?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleRefund = async (donation) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: `Request a refund for ৳${donation.amount}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, refund it!",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      await axiosSecure.delete("/user-donation/refund", {
        data: {
          donationId: donation.donationId,
          userEmail: user.email,
          amount: donation.amount,
        },
      });

      Swal.fire(
        "Refund Requested!",
        "Your refund request has been processed.",
        "success"
      );

      refetch();
    } catch (error) {
      console.error("Refund error:", error);
      Swal.fire(
        "Failed!",
        "Failed to process refund. Please try again.",
        "error"
      );
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
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-semibold text-[#018AE0] mb-4">My Donations</h2>

      {donations.length === 0 ? (
        <p className="text-gray-600">You haven’t made any donations yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-white shadow-md  overflow-hidden">
            <thead className="bg-[#018AE0] border-b text-white">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Pet</th>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Amount (৳)</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={donation._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{donation.petName || 'Unknown'}</td>
                  <td className="px-4 py-2">
                    <img
                      src={donation.petImage || '/placeholder.png'}
                      alt={donation.petName}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 font-medium text-[#018AE0]">
                    ৳{donation.amount?.toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(donation.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleRefund(donation)}
                      className="bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 text-sm rounded"
                    >
                      Request Refund
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

export default MyDonations;
