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
  Bell,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";
import PageTitle from "../hooks/PageTitle.";
import useUserRole from "../hooks/useUserRole";
import { FaPaw } from "react-icons/fa";
import { Skeleton } from "../components/ui/skeleton";

const DashboardLayout = () => {
  const { logOut } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const { role, roleLoading } = useUserRole();

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);
  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      <PageTitle title="Dashboard - United Pets" />
      <div className="min-h-screen flex bg-gray-100">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-[#1446A0] shadow-lg p-4 space-y-6 z-50 transform transition-transform duration-300
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <a href="/" className="flex items-center mb-6">
            <img src={logo} alt="Logo" className="h-10 md:h-14 w-auto" />
          </a>

          <nav className="flex flex-col space-y-3">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-white text-black"
                    : "text-white hover:bg-gray-100 hover:text-black"
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
                    ? "bg-white text-black"
                    : "text-white hover:bg-gray-100 hover:text-black"
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
                    ? "bg-white text-black"
                    : "text-white hover:bg-gray-100 hover:text-black"
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
                    ? "bg-white text-black"
                    : "text-white hover:bg-gray-100 hover:text-black"
                }`
              }
              onClick={closeDrawer}
            >
              <FileText className="w-5 h-5" />
              <span>Adoption Requests</span>
            </NavLink>

            <NavLink
              to="my-adoption"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-white text-black"
                    : "text-white hover:bg-gray-100 hover:text-black"
                }`
              }
              onClick={closeDrawer}
            >
              <FaPaw className="w-5 h-5" />
              <span>My Adoption</span>
            </NavLink>

            <NavLink
              to="create-campaign"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-white text-black"
                    : "text-white hover:bg-gray-100 hover:text-black"
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
                    ? "bg-white text-black"
                    : "text-white hover:bg-gray-100 hover:text-black"
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
                    ? "bg-white text-black"
                    : "text-white hover:bg-gray-100 hover:text-black"
                }`
              }
              onClick={closeDrawer}
            >
              <HeartHandshake className="w-5 h-5" />
              <span>My Donations</span>
            </NavLink>

            {/* Admin Links */}
            {roleLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-md bg-white" />
                ))}
              </div>
            ) : (
              role === "admin" && (
                <>
                  <NavLink
                    to="all-users"
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                        isActive
                          ? "bg-white text-black"
                          : "text-white hover:bg-gray-100 hover:text-black"
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
                          ? "bg-white text-black"
                          : "text-white hover:bg-gray-100 hover:text-black"
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
                          ? "bg-white text-black"
                          : "text-white hover:bg-gray-100 hover:text-black"
                      }`
                    }
                    onClick={closeDrawer}
                  >
                    <Heart className="w-5 h-5" />
                    <span>All Campaigns</span>
                  </NavLink>
                </>
              )
            )}

            <NavLink
              to="my-profile"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-white text-black"
                    : "text-white hover:bg-gray-100 hover:text-black"
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

        {/* Overlay for mobile when sidebar open */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={closeDrawer}
          ></div>
        )}

        {/* Main content */}
        <main className="flex-1 min-h-screen lg:ml-64 p-6 transition-all duration-300 overflow-x-hidden">
          {/* Header */}
          <div className="flex items-center justify-between bg-white shadow rounded-lg px-6 py-3 mb-6 ">
            <h2 className="text-lg font-semibold text-gray-700">
              Welcome to your Dashboard
            </h2>

            <div className="flex items-center space-x-6">
              <button className="relative">
                <Bell className="w-6 h-6 text-gray-600 hover:text-[#1446A0]" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                  3
                </span>
              </button>

              <div className="flex items-center space-x-3">
                <img
                  src={user?.photoURL || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border"
                />
                <span className="font-medium text-gray-700">
                  {user?.displayName || "Guest"}
                </span>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden"
                onClick={toggleDrawer}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Outlet for nested routes */}
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
