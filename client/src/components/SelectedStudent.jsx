import React, { useContext } from "react";
import { StudentContext } from "../Context/SelectStudentsContext";

export const SelectedStudent = () => {
  const { selectedStudents, handleSelectStudents, selectedStudentsId } =
    useContext(StudentContext);
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {selectedStudents.map((student) => (
          <li
            key={student.id}
            className="bg-white shadow-lg rounded-lg p-5 border border-gray-200"
          >
            <div className="flex flex-col items-start space-y-2">
              {/* Student ID */}
              <h1 className="text-lg font-bold text-gray-800">
                ID: {student.id}
              </h1>
              {/* Student Name */}
              <h2 className="text-md text-gray-600">Name: {student.name}</h2>
              {/* Select/Unselect Button */}
              <button
                className={`mt-4 px-4 py-2 rounded-md text-white font-medium shadow-md transition-transform transform active:scale-95 ${
                  selectedStudentsId?.includes(student.id)
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {selectedStudentsId?.includes(student.id)
                  ? "Unselect"
                  : "Select"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
