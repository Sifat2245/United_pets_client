import React, { use } from "react";
import { FaDonate, FaHeart } from "react-icons/fa";
import { GiDogHouse } from "react-icons/gi";
import { MdOutlinePets } from "react-icons/md";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton"

const Overview = () => {
  const adoptionData = [
    { day: "Mon", requests: 3 },
    { day: "Tue", requests: 5 },
    { day: "Wed", requests: 2 },
    { day: "Thu", requests: 8 },
    { day: "Fri", requests: 6 },
    { day: "Sat", requests: 4 },
    { day: "Sun", requests: 7 },
  ];
  const {user} = use(AuthContext)

  const axiosSecure = useAxiosSecure();
  const {data: stats = [], isLoading} = useQuery({
    queryKey: ['userOverview', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-overview/${user.email}`);
      return res.data;
    }
  })

  // if(isLoading){
  //   return <Skeleton className="h-4 w-[250px]" />
  // }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pets Added */}
        <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full text-blue-600">
            <GiDogHouse className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pets Added</p>
            <p className="text-xl font-semibold">{isLoading ? <Skeleton className="h-5 w-[120px]" /> : stats.petsAdded}</p>
          </div>
        </div>

        {/* Adoption Requests */}
        <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-full text-green-600">
            <MdOutlinePets className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Adoption Requests
            </p>
            <p className="text-xl font-semibold">{isLoading ? <Skeleton className="h-4 w-full" /> : stats.adoptionRequests}</p>
            {/* {stats.pendingRequests > 0 && ( */}
            <p className="text-xs text-red-500">Pending: {isLoading?  <Skeleton className="h-4 w-full" />: stats.pendingAdoptions}</p>
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
          <div className="p-3 bg-purple-100 rounded-full text-purple-600">
            <FaDonate className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Active Campaigns
            </p>
            <p className="text-xl font-semibold">{isLoading? <Skeleton className="h-4 w-full" />: stats.activeCampaigns}</p>
          </div>
        </div>
      </div>

      {/* Donations */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-red-100 rounded-full text-red-600">
            <FaHeart className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Total Donations Made
            </p>
            <p className="text-2xl font-semibold">{isLoading? <Skeleton className="h-4 w-full" />: stats.totalDonations}৳</p>
          </div>
        </div>

      </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            Adoption Requests Last 7 Days
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={adoptionData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="requests"
                stroke="#3182CE"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
    </div>
  );
};

export default Overview;
