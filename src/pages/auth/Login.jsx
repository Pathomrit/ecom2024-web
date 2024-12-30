import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";
const Login = () => {
  // Javascript
  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);
  const user = useEcomStore((state) => state.user);
  // console.log("user from zustand", user);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleOnChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(form);
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      roleRedirect(role);
      toast.success("Welcome back");
    } catch (error) {
      console.log(error);
      const errMsg = error.response?.data?.message;
      toast.error(errMsg);
    }

    // Send email and password to backend

    // try {
    //   const res = await axios.post("https://ecom2024-api-ten.vercel.app/api/login", form);
    //   console.log(res);
    //   toast.success(res.data);
    // } catch (error) {
    //   const errMsg = error.response?.data?.message;
    //   toast.error(errMsg);
    //   console.log(error);
    // }
  };
  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };
  return (
    <div className="flex items-center min-h-screen justify-center">
      <div className="flex flex-col items-center border shadow-xl gap-4 rounded-md px-16 py-5">
        <h1 className="text-2xl font-bold">Login</h1>
        <div className="flex flex-col gap-4 m-auto ">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2 flex-col">
              <h2 className="font-semibold">Email :</h2>
              <input
                className="border px-2 py-1  md:w-80 lg:w-96"
                onChange={handleOnChange}
                name="email"
                type="email"
              />
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="font-semibold">Password :</h2>
              <input
                className="border px-2 py-1  md:w-80 lg:w-96"
                onChange={handleOnChange}
                name="password"
                type="password"
              />
            </div>
            <button className="bg-blue-500 rounded-md p-2 text-white hover:bg-blue-600 w-full mt-4">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
