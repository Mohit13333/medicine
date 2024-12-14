import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../slices/globalSlice";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const loading = useSelector((state) => state.global.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    setError("");

    try {
      const response = await registerUser({ name, email, password });
      dispatch(setUser(response.data.user));
      navigate("/login");
    } catch (error) {
      // console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };
  if (loading) {
    return (
      <section className="flex flex-col items-center justify-center h-screen">
        <div className="w-[100px] h-[100px] border-8 border-t-8 border-r-blue-500 border-t-green-500 border-l-rose-500 border-solid rounded-full animate-spin"></div>
        <p className="text-md m-2 text-black">
          Establishing connection, please wait...
        </p>
      </section>
    );
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-96"
        onSubmit={handleRegister}
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded w-full py-2 px-3 mb-4"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded w-full py-2 px-3 mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded w-full py-2 px-3 mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Register
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p>
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer"
          >
            {" "}
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
