import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./components/AdminDashboard";
import Logout from "./components/Logout";
import Log from "./components/Log";
import Medicine from "./components/Medicine";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/logs" element={<Log />} />
        <Route path="/" element={<PrivateRoute element={Medicine} />} />
        <Route
          path="/admin-dashboard"
          element={<PrivateRoute element={AdminDashboard} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
