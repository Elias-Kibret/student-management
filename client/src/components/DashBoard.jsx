import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./index";
import { SelectedStudent } from "./index";
export const DashBoard = () => {
  return (
    <div>
      {" "}
      <Header />
      <Outlet />
    </div>
  );
};
