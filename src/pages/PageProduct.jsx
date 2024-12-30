import { ShoppingBasket } from "lucide-react";
import React from "react";
import { use } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
const PageProduct = () => {
  const actionAddToCart = useEcomStore((state) => state.actionAddToCart);
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex gap-10">
      {/* Left */}
      <div>
        <img
          src={item.images[0].url}
          alt=""
          className="min-h-screen w-4/4 mx-auto"
        />
      </div>
      {/* Right */}
      <div className="space-y-5">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl mt-16  font-semibold">{item.title}</h1>
          <p className="text-xl">
            {item.description === "" ? "No description" : item.description}
          </p>
          <p className="text-xl">Price : {item.price} bath</p>
          <p className="text-xl">
            Quantity :
            {item.quantity ? (
              item.quantity > 1 ? (
                ` ${item.quantity} items`
              ) : (
                ` ${item.quantity} item`
              )
            ) : (
              <span className="text-red-500"> Sold out</span>
            )}
          </p>
        </div>
        <div className="flex justify-end gap-10 mr-10">
          <button
            className="bg-red-500 px-4 py-2 rounded-md hover:scale-105 shadow-md text-white"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            className="bg-green-600 px-4 py-2 rounded-md hover:scale-105 shadow-md"
            onClick={() => actionAddToCart(item)}
          >
            <ShoppingBasket className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageProduct;
