import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/company/login", formData);
      localStorage.setItem("token", response.data.token);
      navigate("/company-dashboard"); 
    } 
    catch (error) {
        if (error.response?.data?.error === "Your company is not active. Please contact support.") {
          setError("Your company is not active. Please contact support.");
        } else {
          setError(error.response?.data?.error || "Login failed");
        }
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl transform transition-all duration-00 hover:scale-105">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Login
        </h1>

        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
