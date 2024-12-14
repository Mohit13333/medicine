import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "../services/api";
import { FaBars, FaTimes } from "react-icons/fa";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState({ role: "user" });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const fetchUsers = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await getUser(userId);
    //   console.log(response);
      setUsers({ role: response.data.role }); 
    } catch (error) {
      // console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again.");
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <nav className="fixed top-0 right-0 w-full bg-gray-800 rounded-xsm text-white z-50">
    <div className="flex justify-between items-center px-6 py-4">
      <div className="text-2xl font-bold">
        <img src="/images/medicine.png" alt="logo" className="w-10 rounded-xl" />
      </div>
      <button
        className="text-2xl sm:hidden focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <FaTimes className="text-white" />
        ) : (
          <FaBars className="text-white" />
        )}
      </button>
      <ul className="hidden sm:flex space-x-8 text-lg font-medium">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-green-500 font-bold" : "hover:text-gray-300"
            }
          >
            Medicine Schedule
          </NavLink>
        </li>
        {users.role === "admin" ? (
          <li>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                isActive ? "text-green-500 font-bold" : "hover:text-gray-300"
              }
            >
              Admin Dashboard
            </NavLink>
          </li>
        ) : null}
        <li>
          <NavLink
            to="/logs"
            className={({ isActive }) =>
              isActive ? "text-green-500 font-bold" : "hover:text-gray-300"
            }
          >
            Logs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/logout"
            className={({ isActive }) =>
              isActive ? "text-green-500 font-bold" : "hover:text-gray-300"
            }
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  
    {isOpen && (
      <div className="sm:hidden bg-gray-800 py-4 px-6">
        <ul className="space-y-4 text-lg font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-green-500 font-bold" : "hover:text-gray-300"
              }
              onClick={toggleMenu}
            >
              Medicine Schedule
            </NavLink>
          </li>
          {users.role === "admin" ? (
            <li>
              <NavLink
                to="/admin-dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-500 font-bold" : "hover:text-gray-300"
                }
                onClick={toggleMenu}
              >
                Admin Dashboard
              </NavLink>
            </li>
          ) : null}
          <li>
            <NavLink
              to="/logs"
              className={({ isActive }) =>
                isActive
                  ? "text-green-500 font-bold" : "hover:text-gray-300"
              }
              onClick={toggleMenu}
            >
              Logs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                isActive
                  ? "text-green-500 font-bold" : "hover:text-gray-300"
              }
              onClick={toggleMenu}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    )}
  </nav>
  
  );
};

export default Navbar;
