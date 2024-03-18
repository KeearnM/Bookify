import React from "react";
import { Outlet } from "react-router-dom";
import { RefetchProvider } from "./RefetchContext";

const RefetchLayout = () => {
  return (
    <RefetchProvider>
      <Outlet />
    </RefetchProvider>
  );
};

export default RefetchLayout;
