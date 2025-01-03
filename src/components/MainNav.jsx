import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown, AlignJustify, LogIn } from "lucide-react";
const MainNav = () => {
  const carts = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const logout = useEcomStore((state) => state.logout);
  const [down, setDown] = useState(false);
  const [downMenu, setDownMenu] = useState(false);
  const toggleDropdown = () => {
    setDown(!down);
    // console.log(down);
  };
  const toggleDropdownMenu = () => {
    setDownMenu(!downMenu);
    // console.log(down);
  };
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // console.log(carts.length);
  return (
    <nav className="bg-gray-400 w-full">
      <div className="mx-auto px-10">
        <div className="justify-between h-16 items-center flex">
          <div className="flex items-center gap-5">
            <Link to="/" className="text-2xl font-bold">
              <img
                src="https://craftycotton.co/wp-content/uploads/2024/09/d987aaeb-e902-495b-805e-91cb90e56215.png"
                className="h-14 w-14 rounded-full"
              />
            </Link>
            {isLargeScreen ? (
              <div className="flex items-center gap-5">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-500 px-3 py-2 rounded-lg font-medium"
                      : "px-3 py-2 rounded-lg font-medium hover:bg-gray-500"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-500 px-3 py-2 rounded-lg font-medium"
                      : "px-3 py-2 rounded-lg font-medium hover:bg-gray-500"
                  }
                >
                  Shop
                </NavLink>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-500 px-3 py-2 rounded-lg font-medium "
                      : "px-3 py-2 rounded-lg font-medium hover:bg-gray-500 "
                  }
                >
                  Cart
                  <span className="absolute top-0  text-sm bg-red-500 rounded-full px-1">
                    {carts.length > 0 ? `${carts.length}` : ""}
                  </span>
                </NavLink>
              </div>
            ) : (
              ""
            )}
          </div>
          {isLargeScreen ? (
            <div>
              {user ? (
                <div className="flex items-center gap-10 relative">
                  <button
                    className=" relative flex items-center gap-2 px-4 hover:bg-gray-500 rounded-md "
                    onClick={() => toggleDropdown()}
                  >
                    <p className="text-lg font-semibold">{user.email}</p>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
                      className="w-10 h-10 rounded-full"
                      alt="avatar"
                    />
                    <ChevronDown />
                  </button>
                  {down && (
                    <div className="flex flex-col absolute top-10 bg-white w-full z-50">
                      <div className="text-center w-full">
                        <Link
                          to={"/user/history"}
                          className="block  py-2 hover:bg-gray-500 w-full "
                        >
                          History
                        </Link>
                        <Link
                          onClick={() => logout()}
                          className="block  py-2 hover:bg-gray-500 w-full "
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-10">
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-gray-500 px-3 py-2 rounded-lg font-medium "
                        : "px-3 py-2 rounded-lg font-medium hover:bg-gray-500 "
                    }
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-gray-500 px-3 py-2 rounded-lg font-medium flex items-center justify-center"
                        : "px-3 py-2 rounded-lg font-medium hover:bg-gray-500 flex items-center justify-center"
                    }
                  >
                    <LogIn className="mr-2" />
                    Login
                  </NavLink>
                </div>
              )}
            </div>
          ) : (
            <button
              className="border border-black p-1 rounded-md relative hover:bg-gray-500"
              onClick={toggleDropdownMenu}
            >
              <AlignJustify />
              {downMenu && (
                <div className="absolute bg-white z-50 top-10 right-0 w-40 py-1 rounded-lg flex flex-col gap-2">
                  {user ? (
                    <div className="flex flex-col w-4/5 gap-2 mx-auto ">
                      <Link
                        to={"/user/history"}
                        className="px-3 py-2  font-medium hover:bg-gray-500 rounded-lg"
                      >
                        History
                      </Link>
                      <Link
                        onClick={() => logout()}
                        to="/"
                        className="px-3 py-2  font-medium hover:bg-gray-500 rounded-lg"
                      >
                        Logout
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col mx-auto w-4/5 gap-2">
                      <Link
                        to="/register"
                        className="px-3 py-2  font-medium hover:bg-gray-500 rounded-lg"
                      >
                        Register
                      </Link>
                      <NavLink
                        to="/login"
                        className="px-3 py-2  font-medium hover:bg-gray-500 rounded-lg flex items-center justify-center"
                      >
                        <LogIn className="mr-1" />
                        Login
                      </NavLink>
                    </div>
                  )}
                  <hr className="mx-4" />
                  <div className="flex flex-col mx-auto w-4/5 gap-2 ">
                    <Link
                      to="/"
                      className="px-3 py-2  font-medium hover:bg-gray-500 rounded-lg"
                    >
                      Home
                    </Link>
                    <Link
                      to="/shop"
                      className="px-3 py-2  font-medium hover:bg-gray-500 rounded-lg"
                    >
                      Shop
                    </Link>
                    <div className="px-3 py-2  font-medium hover:bg-gray-500 rounded-lg relative">
                      <Link to="/cart" className="">
                        Cart
                        <span className="absolute bottom-full left-full text-sm bg-red-500 rounded-full px-1">
                          {carts.length > 0 ? `${carts.length}` : ""}
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
