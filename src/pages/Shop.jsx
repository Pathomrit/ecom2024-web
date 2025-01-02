import React, { useEffect, useState } from "react";
import ProductCard from "../components/card/ProductCard";
import useEcomStore from "../store/ecom-store";
import SearchCard from "../components/card/SearchCard";
import CartCard from "../components/card/CartCard";

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
  useEffect(() => {
    getProduct();
  }, []);
  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[25%_auto_25%] lg:grid-cols-[25%_50%_25%]">
      {/* SearchBar */}
      <div className="p-4 bg-gray-100 md:min-h-screen w-full mx-auto">
        <SearchCard />
      </div>

      {/* Product */}
      <div className="p-4 min-h-screen overflow-y-auto flex flex-col">
        <p className="text-2xl font-bold mb-4">All Product</p>
        <div className="flex flex-wrap gap-4 justify-center xl:justify-start mx-auto">
          {/* Product Card */}
          {products.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}

          {/* Product Card */}
        </div>
      </div>
      {/* Cart */}
      {isLargeScreen ? (
        <div className="p-4 bg-gray-100 min-h-screen overflow-y-auto w-full ">
          <CartCard />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Shop;
