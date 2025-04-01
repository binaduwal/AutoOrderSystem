import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCity } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";

const SettingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start min-h-screen bg-white-100 py-5 pl-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Settings</h2>
      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => navigate("/admin/province")}
          className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white font-semibold rounded-2xl hover:bg-indigo-500 transition duration-300"
        >
          <GrMapLocation /> Province Management
        </button>

        <button
          onClick={() => navigate("/admin/city")}
          className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white font-semibold rounded-2xl hover:bg-indigo-500 transition duration-300"
        >
          <FaCity /> City Management
        </button>

        <button
          onClick={() => navigate("/admin/location")}
          className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white font-semibold rounded-2xl hover:bg-indigo-500 transition duration-300"
        >
          <FaMapMarkerAlt /> Address Management
        </button>

      </div>
    </div>
  );
};

export default SettingPage;
