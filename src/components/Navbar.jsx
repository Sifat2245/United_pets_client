import { Menu, X } from "lucide-react";
import { use, useState } from "react";
import Logo from "../assets/logo.png";
import { NavLink } from "react-router";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, logOut } = use(AuthContext);

  const openSignupModal = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const openLoginModal = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const navLinks = (
    <>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `hover:text-[#D61C62] transition-all duration-300 ${
            isActive ? "text-[#D61C62]" : ""
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to={"/Adopt"}
        className={({ isActive }) =>
          `hover:text-[#D61C62] transition-all duration-300 ${
            isActive ? "text-[#D61C62]" : ""
          }`
        }
      >
        Adopt
      </NavLink>
      <NavLink
        to={"/services"}
        className={({ isActive }) =>
          `hover:text-[#D61C62] transition-all duration-300 ${
            isActive ? "text-[#D61C62]" : ""
          }`
        }
      >
        Services
      </NavLink>
      <NavLink
        to={"/about"}
        className={({ isActive }) =>
          `hover:text-[#D61C62] transition-all duration-300 ${
            isActive ? "text-[#D61C62]" : ""
          }`
        }
      >
        About
      </NavLink>
      <NavLink
        to={"/gallery"}
        className={({ isActive }) =>
          `hover:text-[#D61C62] transition-all duration-300 ${
            isActive ? "text-[#D61C62]" : ""
          }`
        }
      >
        Gallery
      </NavLink>
      <NavLink
        to={"/contact"}
        className={({ isActive }) =>
          `hover:text-[#D61C62] transition-all duration-300 ${
            isActive ? "text-[#D61C62]" : ""
          }`
        }
      >
        Contact
      </NavLink>
    </>
  );
  return (
    <nav className="bg-white shadow-md py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-shrink-0">
          <a
            href="/"
            className="text-gray-800 text-2xl font-bold flex items-center"
          >
            <img src={Logo} alt="" className="h-12 w-32 md:h-14 md:w-40" />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 rounded-md p-2"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-10 font-semibold">
          {navLinks}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <button
              className="px-4 py-2 rounded-md text-gray-700 font-semibold border border-gray-500 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => logOut()}
            >
              Logout
            </button>
          ) : (
            <>
              <button
                className="px-4 py-2 rounded-md text-gray-700 font-semibold border border-gray-500 hover:bg-gray-100 transition-colors duration-200"
                onClick={openLoginModal}
              >
                Login
              </button>
              <button
                className="px-4 py-2 rounded-md text-white bg-[#018AE0] font-semibold border border-[#018AE0] hover:bg-[#0174e0] transition-colors duration-200"
                onClick={openSignupModal}
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu (conditionally rendered) */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#0000003d] bg-opacity-40 z-30"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Drawer (Animated) */}
          <div
            className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <span className="text-lg font-semibold text-gray-800">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close drawer"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <div className="flex flex-col p-4 space-y-4">
              {navLinks}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                {user ? (
                  <button
                    className="px-4 py-2 rounded-md text-gray-700 font-semibold border border-gray-500 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => logOut()}
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <button
                      className="px-4 py-2 rounded-md text-gray-700 font-semibold border border-gray-500 hover:bg-gray-100 transition-colors duration-200"
                      onClick={openLoginModal}
                    >
                      Login
                    </button>
                    <button
                      className="px-4 py-2 rounded-md text-white bg-[#018AE0] font-semibold border border-[#018AE0] hover:bg-[#0174e0] transition-colors duration-200"
                      onClick={openSignupModal}
                    >
                      Signup
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={closeSignupModal}
        onOpenLogin={openLoginModal}
      ></SignupModal>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onOpenSignup={openSignupModal}
      ></LoginModal>
     
    </nav>
  );
};

export default Navbar;
