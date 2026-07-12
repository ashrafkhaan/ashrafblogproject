import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../utils";

const Sidebar = ({ setComponent }) => {
  const { profile, setProfile, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();
  const [show, setShow] = useState(false);

  const handleComponents = (value) => {
    setComponent(value);
  };

  const gotoHome = () => navigateTo("/");

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.get(`${BACKEND_URL}/api/users/logout`, {
        withCredentials: true,
      });

      toast.success("Logout Successfully");
      setProfile(null);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div
        className="sm:hidden fixed top-4 left-4 z-50"
        onClick={() => setShow(!show)}
      >
        <IoMdMenu className="text-3xl text-gray-800" />
      </div>

      {/* Sidebar */}
      <div
        // className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300
        // ${show ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300
${show ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Close Button */}
        <div
          className="sm:hidden absolute top-4 right-4 cursor-pointer"
          onClick={() => setShow(false)}
        >
          <FaArrowLeftLong className="text-2xl text-gray-600" />
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center py-10 border-b">
          <img
            src={profile?.photo?.url}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover shadow-md border-4 border-blue-100"
          />

          <h2 className="mt-3 text-lg font-semibold text-gray-800">
            {profile?.name}
          </h2>

          <p className="text-sm text-gray-500">Admin Dashboard</p>
        </div>

        {/* Menu */}
        <div className="px-5 py-6 space-y-3">

          <button
            onClick={() => handleComponents("My Blogs")}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-linear-to-r from-green-500 to-green-600 text-white font-medium hover:scale-105 transition"
          >
            My Blogs
          </button>

          <button
            onClick={() => handleComponents("Create Blog")}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 text-white font-medium hover:scale-105 transition"
          >
            Create Blog
          </button>

          <button
            onClick={() => handleComponents("My Profile")}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-linear-to-r from-pink-500 to-pink-600 text-white font-medium hover:scale-105 transition"
          >
            My Profile
          </button>

          <button
            onClick={gotoHome}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-blue-600 text-white font-medium hover:scale-105 transition"
          >
            Home
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;