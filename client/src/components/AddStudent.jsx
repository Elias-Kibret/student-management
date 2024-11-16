import React, { useState } from "react";
import axios from "axios";

export const AddStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    gpa: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!student.name || !student.gpa) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      const { name, gpa } = student;
      const response = await axios.post(
        "http://localhost:8080/api/v1/students",
        { name, gpa }
      );
      console.log(response.data);
      // Clear the form after successful submission
      setStudent({ name: "", gpa: "" });
      setError(""); // Reset error
    } catch (error) {
      console.error("There was an error adding the student:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add Student</h1>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md">
          <p>{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="studentName"
            className="block text-gray-700 font-medium mb-2"
          >
            Student Name:
          </label>
          <input
            type="text"
            id="studentName"
            name="name"
            value={student.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter student's name"
          />
        </div>

        <div>
          <label htmlFor="gpa" className="block text-gray-700 font-medium mb-2">
            GPA:
          </label>
          <input
            type="number"
            id="gpa"
            name="gpa"
            value={student.gpa}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter student's GPA"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};
