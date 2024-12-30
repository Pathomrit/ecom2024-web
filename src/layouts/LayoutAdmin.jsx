import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBarAdmin from "../components/admin/SideBarAdmin";
import HeaderBarAdmin from "../components/admin/HeaderBarAdmin";

const LayoutAdmin = () => {
  const [title, setTitle] = useState("Dashboard");
  return (
    <div className="flex h-screen">
      <SideBarAdmin setTitle={setTitle} />
      <div className="flex-1 flex flex-col">
        <HeaderBarAdmin title={title} />
        <main className="flex-1 p-6 bg-gray-300 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
