import React, { useState, useEffect } from "react";
import { Students } from "./Students";
import axios from "axios";

export const Student = () => {
  const [students, setStudents] = useState([]);
  const [filterStudent, setFilterStudent] = useState([]);
  const [filterCateria, setFilterCateria] = useState({
    field: "",
    value: "",
  });

  useEffect(() => {
    fetchAllStudents();
  }, []);

  const handleFilter = async (event) => {
    event.preventDefault();
    if (filterCateria.filter !== "" && filterCateria.value !== "") {
      await fetchFilterData(filterCateria);
    }
  };
  const fetchAllStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/students");
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFilterData = async (filterCateria) => {
    try {
      const { field, value } = filterCateria;
      console.log(field, value);
      const response = await axios.get(
        "http://localhost:8080/api/v1/students",
        {
          params: {
            filter: field,
            input: value,
          },
        }
      );
      console.log(response.data);
      setFilterStudent(response.data);
    } catch (error) {
      console.error("Error fetching filtered students:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilterCateria({ ...filterCateria, [name]: value });
  };

  return (
    <div className="bg-gray-50 p-6 flex flex-col items-center space-y-6">
      {/* Filter Section */}
      <div className="bg-white shadow-lg rounded-md px-6 py-3 max-w-4xl ">
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
              type={filterCateria.field == "gpa" ? "number" : "text"}
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

      {/* Student Cards Section */}
      {filterStudent.length > 0 ? (
        <Students students={filterStudent} />
      ) : (
        <Students students={students} />
      )}
    </div>
  );
};
