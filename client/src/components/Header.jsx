import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="bg-gradient-to-r from-[#1e3a5f] via-[#27476e] to-[#2e587d] text-white p-4 shadow-lg flex justify-between items-center">
      <nav className="flex space-x-6">
        <Link
          to="/students"
          className="hover:text-blue-300 text-lg font-semibold transition duration-300 ease-in-out"
        >
          Students
        </Link>
        <Link
          to="/add-student"
          className="hover:text-blue-300 text-lg font-semibold transition duration-300 ease-in-out"
        >
          Add Student
        </Link>
        <Link
          to="/selected-student"
          className="hover:text-blue-300 text-lg font-semibold transition duration-300 ease-in-out"
        >
          Selected Students
        </Link>
      </nav>
    </div>
  );
};
