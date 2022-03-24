import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="form_container">
      <Outlet />
    </main>
  );
};

export default Layout;
