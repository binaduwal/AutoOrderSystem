import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc"; 
import { Link,useNavigate} from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData]=useState({
    email:'',
    password:'',
    firstName:'',
    lastName:''
  })

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/signup", formData);
      console.log(response.data);
      alert("Account Created Successfully");
      navigate("/dashboard")
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.message)    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">Create New Account</h1>
        <p className="text-gray-600 text-center mb-6">It's free to sign up and only takes a minute.</p>

        <form method='post' className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium text-left" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
              placeholder="Enter your email address"
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium text-left" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              required
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* First Name */}
          <div>
            <label className="block text-gray-700 font-medium text-left" htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
              required
              placeholder="Enter your first name"
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700 font-medium text-left" htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
              required
              placeholder="Enter your last name"
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold transition duration-300 hover:bg-indigo-700"
          >
            Create Account
          </button>

          {/* OR Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">OR</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="flex justify-center space-x-4">
            <button className="w-full flex items-center justify-center bg-white text-black py-3 rounded-md font-semibold border border-gray-300 transition duration-300 hover:bg-gray-100">
              <FcGoogle className="mr-2 text-xl" />
              Continue with Google
            </button>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <Link to="/" className="text-indigo-600 font-semibold hover:underline transition duration-300">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
