import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Users = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = async (id, newRole) => {
    const confirm = await Swal.fire({
      title: "Make Admin?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, make admin",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.patch(`/users/${id}/role`, { role: newRole });
      Swal.fire("Success!", "User is now an admin.", "success");
      refetch();
    }
  };

  const handleBanUser = async (id) => {
    const confirm = await Swal.fire({
      title: "Ban this user?",
      text: "They will not be able to log in anymore.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, ban user",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.patch(`/users/${id}/ban`);
      Swal.fire("Banned!", "User has been banned.", "success");
      refetch();
    }
  };

  if (isLoading)
    return <div className="text-center py-10">Loading users...</div>;

  return (
    <div className="p-4 ">
      <h2 className="text-2xl font-semibold mb-4">All Users</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white">
          <thead className="bg-base-200">
            <tr className="text-left">
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Profile</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Role</th>
              <th className="p-3 border-b">Make Admin</th>
              <th className="p-3 border-b">Ban</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user, idx) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-all">
                <td className="p-3">{idx + 1}</td>
                <td className="p-3">
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="p-3">{user.name || "No Name"}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role || "user"}</td>
                <td className="p-3">
                  {user.role === "admin" ? (
                    <span className="text-green-600 font-medium">Admin</span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id, "admin")}
                      className="bg-blue-500 hover:bg-blue-600 py-1 px-3 text-white rounded"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td className="p-3">
                  {user.role === "admin" ? (
                    <span className="text-gray-400 italic">
                      Admin (Cannot ban)
                    </span>
                  ) : user.banned ? (
                    <span className="text-red-500 font-medium">Banned</span>
                  ) : (
                    <button
                      onClick={() => handleBanUser(user._id)}
                      className="bg-red-500 hover:bg-red-600 px-3 py-1 text-white rounded"
                    >
                      Ban User
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
