import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./index";
export const DashBoard = () => {
  return (
    <div>
      {" "}
      <Header />
      
      <Outlet />
    </div>
  );
};
