import React, { useState, useEffect } from "react";
import { Students } from "./Students";
import axios from "axios";

export const Student = () => {
  const [students, setStudents] = useState([]); // All students
  const [filterStudent, setFilterStudent] = useState([]); // Filtered students
  const [filterCateria, setFilterCateria] = useState({
    field: "",
    value: "",
  });

  useEffect(() => {
    // Fetch all students when component mounts
    fetchAllStudents();
  }, []);

  // Handle filter form submission
  const handleFilter = async (event) => {
    event.preventDefault();
    if (filterCateria.field !== "" && filterCateria.value !== "") {
      // Apply filter only when both field and value are provided
      await fetchFilterData(filterCateria);
    }
  };

  // Fetch all students
  const fetchAllStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/students");
      setStudents(response.data); // Store all students
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Fetch filtered students
  const fetchFilterData = async (filterCateria) => {
    try {
      const { field, value } = filterCateria;
      console.log(`Fetching filter data with ${field}: ${value}`);
      const response = await axios.get(
        "http://localhost:8080/api/v1/students",
        {
          params: {
            filter: field, // The filter field (e.g., "gpa", "program")
            input: value, // The value to filter by
          },
        }
      );
      console.log("Filtered data: ", response.data);
      setFilterStudent(response.data); // Update filtered students
    } catch (error) {
      console.error("Error fetching filtered students:", error);
    }
  };

  // Handle changes in the filter form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterCateria({ ...filterCateria, [name]: value });
  };

  return (
    <div className="bg-gray-50 p-6 flex flex-col items-center space-y-6">
      {/* Filter Section */}
      <div className="bg-white shadow-lg rounded-md px-6 py-3 max-w-4xl">
        <form className="flex items-center space-x-6" onSubmit={handleFilter}>
          <div className="flex items-center">
            <label className="text-gray-600 font-medium mr-3">Filter</label>
            <select
              className="w-40 p-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="field"
              value={filterCateria.field}
              onChange={handleChange}
            >
              <option value="">N/A</option>
              <option value="gpa">{`<`} GPA</option>
              <option value="program">Program</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="text-gray-600 font-medium mr-3">Input</label>
            <input
              type={filterCateria.field === "gpa" ? "number" : "text"}
              step="any"
              className="w-60 p-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter value"
              name="value"
              value={filterCateria.value}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-md font-medium hover:bg-blue-600 transition duration-300"
          >
            Apply
          </button>
        </form>
      </div>

      {/* Students Cards Section */}
      {/* Conditionally render filtered students if they exist, otherwise render all students */}
      <Students
        students={filterStudent.length  >  0 || filterCateria.gap!=="" && filterCateria.value!="" ? filterStudent : students}
      />
    </div>
  );
};
