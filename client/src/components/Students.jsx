import React from "react";
import { Link } from "react-router-dom";

export const Students = ({ students }) => {
  return (
    <div className="w-full max-w-6xl mt-10">
      {students?.length < 1 ? (
        <div className="flex justify-center items-center p-6 bg-red-50 border border-red-200 text-red-700 rounded-md">
          <p className="text-lg font-medium">No data found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {students.map((student) => (
            <Link
              key={student.id}
              to={`/students/${student.id}`}
              state={{ student }}
              className="block bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md hover:shadow-2xl hover:scale-105 transition transform duration-300 p-6"
            >
              <div className="flex flex-col items-center text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {student.name}
                </h2>
                <p className="text-gray-600 font-medium">ID: {student.id}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
