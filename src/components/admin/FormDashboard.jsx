import React from "react";
import useEcomStore from "../../store/ecom-store";

const FormDashboard = () => {
  const user = useEcomStore((state) => state.user);
  // console.log(user);
  return (
    <div className="container mx-auto p-4 bg-white shadow-2xl rounded-lg">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <div className="mt-4 flex gap-4 flex-col">
        <div className="flex gap-4 flex-wrap">
          <h2 className="text-xl font-semibold">Email</h2>
          <p>:</p>
          <p className="text-lg">{user.email}</p>
        </div>
        <div className="flex gap-4 flex-wrap">
          <h2 className="text-xl font-semibold">Role</h2>
          <p>:</p>
          <p className="text-lg">{user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default FormDashboard;
