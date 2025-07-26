import React, { useContext, useState } from "react";
import { Outlet, NavLink } from "react-router";
import {
  LayoutDashboard,
  PawPrint,
  LogOut,
  Users,
  Menu,
  X,
  Dog,
  FileText,
  HandHeart,
  Wallet,
  HeartHandshake,
  UserRound,
  Heart,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";
import PageTitle from "../hooks/PageTitle.";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const { logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { role, roleLoading } = useUserRole();
  const toggleDrawer = () => setIsOpen(!isOpen);
  const closeDrawer = () => setIsOpen(false);

  console.log(role);

  return (
    <>
      <PageTitle title={"Dashboard - United Pets"}></PageTitle>
      <div className="min-h-screen grid grid-cols-12 bg-gray-100 relative">
        <button
          className="md:hidden absolute top-4 right-4 z-50 bg-white p-2 rounded-full shadow"
          onClick={toggleDrawer}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <aside
          className={`bg-white shadow-lg p-4 space-y-6 col-span-12 md:col-span-2 md:block fixed md:relative top-0 left-0 h-full z-40 transition-transform duration-300 transform md:translate-x-0 w-64 md:w-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <a
            href="/"
            className="text-gray-800 text-2xl font-bold flex items-center"
          >
            <img src={logo} alt="Logo" className="h-8 w-26 md:h-14 md:w-40" />
          </a>
          <nav className="flex flex-col space-y-3">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-[#018AE0] text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`
              }
              onClick={closeDrawer}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Overview</span>
            </NavLink>

            <NavLink
              to="add-pet"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-[#018AE0] text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`
              }
              onClick={closeDrawer}
            >
              <PawPrint className="w-5 h-5" />
              <span>Add A Pet</span>
            </NavLink>

            <NavLink
              to="my-pets"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-[#018AE0] text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`
              }
              onClick={closeDrawer}
            >
              <Dog className="w-5 h-5" />
              <span>My Added Pets</span>
            </NavLink>

            <NavLink
              to="adoption-requests"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-[#018AE0] text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`
              }
              onClick={closeDrawer}
            >
              <FileText className="w-5 h-5" />
              <span>Adoption Requests</span>
            </NavLink>

            <NavLink
              to="create-campaign"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-[#018AE0] text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`
              }
              onClick={closeDrawer}
            >
              <HandHeart className="w-5 h-5" />
              <span>Create Campaign</span>
            </NavLink>

            <NavLink
              to="my-campaigns"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-[#018AE0] text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`
              }
              onClick={closeDrawer}
            >
              <Wallet className="w-5 h-5" />
              <span>My Campaigns</span>
            </NavLink>

            <NavLink
              to="my-donations"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-[#018AE0] text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`
              }
              onClick={closeDrawer}
            >
              <HeartHandshake className="w-5 h-5" />
              <span>My Donations</span>
            </NavLink>

            {!roleLoading && role === "admin" && (
              <>
                <NavLink
                  to="all-users"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                      isActive
                        ? "bg-[#018AE0] text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`
                  }
                  onClick={closeDrawer}
                >
                  <UserRound className="w-5 h-5" />
                  <span>Users</span>
                </NavLink>

                <NavLink
                  to="all-pets"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                      isActive
                        ? "bg-[#018AE0] text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`
                  }
                  onClick={closeDrawer}
                >
                  <Dog className="w-5 h-5" />
                  <span>All Pets</span>
                </NavLink>

                <NavLink
                  to="all-donations"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                      isActive
                        ? "bg-[#018AE0] text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`
                  }
                  onClick={closeDrawer}
                >
                  <Heart className="w-5 h-5" />
                  <span>All Donations</span>
                </NavLink>
              </>
            )}

            <NavLink
              to="my-profile"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-[#018AE0] text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`
              }
              onClick={closeDrawer}
            >
              <Users className="w-5 h-5" />
              <span>My Profile</span>
            </NavLink>

            <button
              onClick={() => {
                logOut();
                closeDrawer();
              }}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-100 transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>
        </aside>

        <main className="col-span-12 md:col-span-10 p-6 md:ml-0 ml-0">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
