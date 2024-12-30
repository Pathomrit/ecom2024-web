import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Wrench,
  LogOut,
  ArrowDownUp,
  ListOrdered,
  AlignJustify,
} from "lucide-react";
import useEcomStore from "../../store/ecom-store";
const SideBarAdmin = ({ setTitle }) => {
  const logout = useEcomStore((state) => state.logout);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const handleToggleSidebar = () => {
    setToggleSidebar(!toggleSidebar);
  };
  return (
    <div className="">
      <button
        onClick={handleToggleSidebar}
        className="mt-4 mx-1 p-1 rounded-md hover:bg-gray-300"
      >
        <AlignJustify />
        {toggleSidebar ? (
          <div className="bg-blue-950 w-64 text-white flex flex-col h-screen absolute top-0 left-0 ease-in">
            <div className="h-24 bg-blue-900 flex items-center justify-center text-2xl font-bold">
              Admin Panel
            </div>
            <nav className="flex-1 px-3 py-6 space-y-2">
              <NavLink
                to={"/admin"}
                end
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center scale-105"
                    : "bg-blue-950 px-4 py-2 hover:bg-blue-700 rounded-lg flex items-center"
                }
                onClick={() => setTitle("Dashboard")}
              >
                <LayoutDashboard className="mr-3" />
                Dashboard
              </NavLink>
              <NavLink
                to={"manage"}
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center scale-105"
                    : "bg-blue-950 px-4 py-2 hover:bg-blue-700 rounded-lg flex items-center"
                }
                onClick={() => setTitle("Manage")}
              >
                <Wrench className="mr-3" />
                Manage
              </NavLink>
              <NavLink
                to={"category"}
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center scale-105"
                    : "bg-blue-950 px-4 py-2 hover:bg-blue-700 rounded-lg flex items-center"
                }
                onClick={() => setTitle("Category")}
              >
                <ArrowDownUp className="mr-3" />
                Category
              </NavLink>
              <NavLink
                to={"product"}
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center scale-105"
                    : "bg-blue-950 px-4 py-2 hover:bg-blue-700 rounded-lg flex items-center"
                }
                onClick={() => setTitle("Product")}
              >
                <ShoppingCart className="mr-3" />
                Product
              </NavLink>
              <NavLink
                to={"orders"}
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center scale-105"
                    : "bg-blue-950 px-4 py-2 hover:bg-blue-700 rounded-lg flex items-center"
                }
                onClick={() => setTitle("Orders")}
              >
                <ListOrdered className="mr-3" />
                Orders
              </NavLink>
            </nav>
            <footer className="items-end pb-5">
              <NavLink
                to={"/"}
                onClick={() => logout()}
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center scale-105"
                    : "bg-blue-950 px-4 py-2 hover:bg-blue-700 rounded-lg flex items-center"
                }
              >
                <LogOut className="mr-3" />
                Logout
              </NavLink>
            </footer>
          </div>
        ) : (
          ""
        )}
      </button>
    </div>
  );
};

export default SideBarAdmin;
