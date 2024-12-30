import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { array, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { useNavigate } from "react-router-dom";
const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(8, { message: "Password must contain more than 8 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password is not match",
    path: ["confirmPassword"],
  });
const Register = () => {
  // Javascript
  const navigate = useNavigate();
  const [passwordScore, setPasswordScore] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const validatePassword = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };
  // const [form, setForm] = useState({
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  const handleOnChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Old Send to Backend
  // const handleOnSubmit = async (e) => {
  //   e.preventDefault();
  //   if (form.password !== form.confirmPassword) {
  //     return alert("Password is not match!!");
  //   }
  //   console.log(form);

  //   // Send email and password to backend
  //   try {
  //     const res = await axios.post("https://ecom2024-api-ten.vercel.app/api/register", form);
  //     console.log(res);
  //     toast.success(res.data);
  //   } catch (error) {
  //     const errMsg = error.response?.data?.message;
  //     toast.error(errMsg);
  //     console.log(error);
  //   }
  // };

  // New Send to Backend
  const onSubmit = async (data) => {
    // console.log(data);
    // console.log(zxcvbn(data.password).score);
    // Check Score Password
    // const passwordScore = zxcvbn(data.password).score;
    // if (passwordScore < 3) {
    //   toast.warning("Password is not strong");
    //   return;
    // }
    try {
      const res = await axios.post(
        "https://ecom2024-api-ten.vercel.app/api/register",
        data
      );
      console.log(res);
      toast.success(res.data);
      navigate("/login");
    } catch (error) {
      const errMsg = error.response?.data?.message;
      toast.error(errMsg);
      console.log(error);
    }
  };

  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]);

  return (
    <div className="flex items-center min-h-screen justify-center">
      <div className="flex flex-col items-center border shadow-xl gap-4 rounded-md px-16 py-5">
        <h1 className="text-2xl font-bold">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 m-auto ">
            {/* Email */}
            <div className="flex gap-2 flex-col">
              <h2 className="font-semibold">Email :</h2>
              {/* Old Register Email*/}
              {/* <input
          className="border"
          onChange={handleOnChange}
          name="email"
          type="email"
        /> */}
              {/* New Register Email*/}
              <input
                {...register("email")}
                className="border px-2 py-1  md:w-80 lg:w-96"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            {/* Password */}
            <div className="flex gap-2 flex-col">
              <h2 className="font-semibold">Password :</h2>
              {/* Old Register Password */}
              {/* <input
          className="border"
          onChange={handleOnChange}
          name="password"
          type="text"
        /> */}
              {/* New Register Password*/}
              <input
                {...register("password")}
                className="border px-2 py-1"
                type="password"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              {watch().password?.length > 0 && (
                <div className="flex rounded-full border p-1">
                  {Array.from(Array(5).keys()).map((item, index) => {
                    return (
                      <span key={index} className="w-1/5 mx-1">
                        <div
                          className={`h-2 rounded-full ${
                            passwordScore <= 2
                              ? "bg-red-500"
                              : passwordScore < 4
                              ? "bg-orange-400"
                              : " bg-green-600"
                          }`}
                        ></div>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
            {/* Confirm Password */}
            <div className="flex gap-2 flex-col">
              <h2 className="font-semibold">Confirm Password :</h2>
              {/* Old Register Confirm Password */}
              {/* <input
          className="border"
          onChange={handleOnChange}
          name="confirmPassword"
          type="text"
        /> */}
              {/* New Register Confirm Password */}
              <input
                {...register("confirmPassword")}
                className="border px-2 py-1"
                type="password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
            <button className="bg-blue-500 rounded-md p-2 text-white hover:bg-blue-600">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
