import React, { useState, useEffect } from "react";
import { listProductBy } from "../../api/product";
import ProductCard from "../card/ProductCard";
import SwiperShow from "../../utils/SwiperShow";
import { SwiperSlide } from "swiper/react";
const NewProduct = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    handleLoadData();
  }, []);
  const handleLoadData = () => {
    listProductBy("updatedAt", "desc", 20)
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <SwiperShow className="flex gap-4 justify-center mx-auto w-full flex-wrap">
      {data?.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <ProductCard item={item} />
          </SwiperSlide>
        );
      })}
    </SwiperShow>
  );
};

export default NewProduct;
