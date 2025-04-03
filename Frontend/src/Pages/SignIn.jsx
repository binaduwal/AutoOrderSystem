import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useLocation } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { username, password };

    try {
      const response = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("role", data.role); 
        console.log("Returned data:", data);
        alert("Login successful!");
        if (data.role === 'superadmin') {
          navigate('/admin/dashboard');
        } else if (data.role === 'salesperson') {
          navigate('/user');
        } else {
          navigate('/');
        }
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Login failed'}`);
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">Sign In</h1>
        <p className="text-gray-600 text-center mt-2 mb-6">
          Welcome back! Please sign in to continue.
        </p>

        {message && <p className="text-red-500 text-center mb-4">{message}</p>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium text-left">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="Enter your username"
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300 transform hover:scale-105"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-gray-700 font-medium text-left">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300 transform hover:scale-105"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a 
              href="#" 
              className="text-indigo-600 text-sm absolute right-3 top-9 hover:underline transition duration-300">
              Forgot Password?
            </a>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold transition duration-300 hover:bg-indigo-700 transform hover:scale-105"
          >
            Sign In
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        <button className="w-full flex items-center justify-center bg-white text-black py-3 rounded-md font-semibold border border-gray-300 transition duration-300 hover:bg-gray-100">
          <FcGoogle className="mr-2 text-xl" />
          Continue with Google
        </button>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 font-semibold hover:underline transition duration-300">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
