import React from "react";
import ContentCarousel from "../components/home/ContentCarousel";
import BestSeller from "../components/home/BestSeller";
import NewProduct from "../components/home/NewProduct";
const Home = () => {
  return (
    <div>
      <ContentCarousel />
      <p className=" flex justify-center items-center m-10 text-2xl font-bold">
        Best Seller Product
      </p>
      <div>
        <BestSeller />
      </div>
      <p className=" flex justify-center items-center m-10 text-2xl font-bold">
        New Product
      </p>
      <NewProduct />
    </div>
  );
};

export default Home;
