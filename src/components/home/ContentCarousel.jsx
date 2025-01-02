import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { listProductBy } from "../../api/product";
const ContentCarousel = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    handleLoadData();
  }, []);
  const handleLoadData = () => {
    listProductBy("price", "desc", 10)
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const handleGetImage = () => {
  //   axios
  //     .get("https://picsum.photos/v2/list?page=1&limit=15")
  //     .then((res) => {
  //       // console.log(res);
  //       setData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Swiper
          pagination={true}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="mySwiper h-80"
        >
          {data?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={item.images[0].url}
                    className="h-64 w-64 object-cover rounded-md mx-auto"
                  />
                  <p className="">{item.title}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      {/* <div>
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          pagination={true}
          navigation={true}
          modules={[Pagination, Autoplay, Navigation]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="mySwiper object-cover rounded-md"
        >
          {data?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <img src={item.download_url} className="rounded-md" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div> */}
    </div>
  );
};

export default ContentCarousel;
