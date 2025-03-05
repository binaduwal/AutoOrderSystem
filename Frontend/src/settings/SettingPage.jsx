import React from "react";
import { useNavigate } from "react-router-dom";

const SettingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex text-left mt-10">
      <button
        onClick={() => navigate("/location")}
        className="px-2 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
      >
        Address Management
      </button>
    </div>
  );
};

export default SettingPage;
