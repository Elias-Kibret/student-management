import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const StudentsDetails = () => {
  const { id } = useParams();

  const [studentDetail, setStudentDetail] = useState();

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/students/${id}`
      );
      setStudentDetail(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Student Info</h1>
        <p className="text-gray-600 mb-2">
          <strong>Name:</strong> {studentDetail?.name || "N/A"}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>ID:</strong> {studentDetail?.id || "N/A"}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>GPA:</strong> {studentDetail?.gpa || "N/A"}
        </p>

        {studentDetail?.courseList?.length > 0 ? (
          <ul className="bg-gray-100 p-4 rounded-md shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Courses
            </h2>
            {studentDetail.courseList.map((course) => (
              <li
                key={course.id}
                className="p-3 mb-2 bg-white rounded-md shadow flex  items-center"
              >
                <span className="text-gray-700">
                  <strong>ID:</strong> {course.id}
                </span>
                <span className="text-gray-700">
                  <strong>Name:</strong> {course.name}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">
            No courses found for this student.
          </p>
        )}
      </div>
      <button>Delete</button>
      <button>Unselect</button>
      <button>Back</button>
    </div>
  );
};
