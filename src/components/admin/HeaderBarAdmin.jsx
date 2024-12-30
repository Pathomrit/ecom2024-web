import React from "react";

const HeaderBarAdmin = ({ title }) => {
  return (
    <header className="bg-white h-16 flex items-center px-6 text-2xl font-bold">
      {title}
    </header>
  );
};

export default HeaderBarAdmin;
