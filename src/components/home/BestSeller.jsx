import React, { useState, useEffect } from "react";
import { listProductBy } from "../../api/product";
import ProductCard from "../card/ProductCard";
import SwiperShow from "../../utils/SwiperShow";
import { SwiperSlide } from "swiper/react";
const BestSeller = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    handleLoadData();
  }, []);
  const handleLoadData = () => {
    listProductBy("sold", "desc", 7)
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <SwiperShow>
      {data?.map((item, index) => (
        <SwiperSlide key={index} className="flex justify-center items-center">
          <div className="flex justify-center items-center">
            <ProductCard item={item} className="w-full max-w-sm" />
          </div>
        </SwiperSlide>
      ))}
    </SwiperShow>
  );
};

export default BestSeller;
