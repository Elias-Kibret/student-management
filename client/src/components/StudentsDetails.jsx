import React, { useState, useEffect, useContext } from "react";
import { StudentContext } from "../Context/SelectStudentsContext";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

export const StudentsDetails = () => {
  const { selectedStudents, handleSelectStudents, selectedStudentsId } =
    useContext(StudentContext);

  console.log(selectedStudentsId);
  const { id } = useParams();
  console.log(selectedStudentsId.includes(id));
  const navigate = useNavigate();
  const { state } = useLocation();
  const studentFromState = state?.student;
  console.log(selectedStudents);
  const [studentDetail, setStudentDetail] = useState(null); // Default to null for better handling of loading state

  useEffect(() => {
    fetchDetails();
  }, [selectedStudents]);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/students/${id}`
      );
      setStudentDetail(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/students/${id}`
      );
      navigate("/");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = () => {
    // If there's a student from state, select/unselect
    handleSelectStudents(studentFromState);
  };

  // Loading state
  if (!studentDetail) {
    return <p>Loading...</p>;
  }

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
          <div className="overflow-x-auto mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-7">
              Courses
            </h2>
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                    ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                    Course Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentDetail?.courseList.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      {course.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      {course.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No courses found for this student.</p>
        )}

        <div className="flex space-x-4 mt-10">
          {/* Delete Button */}
          <button
            className="px-6 py-2 bg-rose-500 text-white font-medium rounded-full shadow-lg hover:bg-rose-600 active:scale-95 focus:ring-2 focus:ring-rose-300 transition-all duration-200"
            onClick={handleDelete}
          >
            Delete
          </button>

          {/* Unselect/Select Button */}
          <button
            className="px-6 py-2 bg-indigo-500 text-white font-medium rounded-full shadow-lg hover:bg-indigo-600 active:scale-95 focus:ring-2 focus:ring-indigo-300 transition-all duration-200"
            onClick={handleSelect}
          >
            {selectedStudentsId?.includes(id) ? "unSelect" : "select"}
          </button>

          {/* Back Button */}
          <Link to={`..`}>
            <button className="px-6 py-2 bg-teal-500 text-white font-medium rounded-full shadow-lg hover:bg-teal-600 active:scale-95 focus:ring-2 focus:ring-teal-300 transition-all duration-200">
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
