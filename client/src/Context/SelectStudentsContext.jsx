import React, { useState, createContext } from "react";

export const StudentContext = createContext();
export const SelectStudentsContext = ({ children }) => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const selectedStudentsId = selectedStudents?.map((item) => item.id);
  const handleSelectStudents = (student) => {
    setSelectedStudents((prevData) => {
      // Check if the student already exists in the list
      const exists = prevData.some((item) => item.id === student.id);
      if (exists) {
        // Remove the student if they exist
        return prevData.filter((item) => item.id !== student.id);
      } else {
        // Add the student if they do not exist
        return [...prevData, student];
      }
    });
  };
  
  return (
    <StudentContext.Provider
      value={{ selectedStudents, handleSelectStudents,selectedStudentsId }}
    >
      {children}
    </StudentContext.Provider>
  );
};
