import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../slices/globalSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const loading = useSelector((state) => state.global.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    setError("");

    try {
      const response = await loginUser({ email, password });
      //   console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("userId", response.data.id);
      dispatch(setUser(response.data.user));
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please try again.");
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
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
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
          Login
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p>
          Don't have an account?
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 cursor-pointer"
          >
            {" "}
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
