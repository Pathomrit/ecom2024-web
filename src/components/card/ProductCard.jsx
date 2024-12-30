import React from "react";
import { ShoppingBasket } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ item }) => {
  // console.log(item);
  const actionAddToCart = useEcomStore((state) => state.actionAddToCart);
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/shop/${item.id}`, { state: { item } });
  };
  const handleAddToCart = (e) => {
    e.stopPropagation(); // ป้องกันการเรียก handleCardClick
    actionAddToCart(item);
  };
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="border rounded-md shadow-md p-2 w-48 cursor-pointer"
          onClick={handleCardClick}
        >
          <div className="flex items-center justify-center">
            {item.images && item.images.length > 0 ? (
              <img
                className="w-24 h-24 rounded-md shadow-md hover:scale-105 hover:duration-200 object-fit "
                src={item.images[0].url}
              />
            ) : (
              <div className="w-full h-24 bg-gray-100 rounded-md text-center flex justify-center items-center shadow-md hover:scale-105 hover:duration-200">
                No Image
              </div>
            )}
          </div>
          <div className="py-3">
            <p className="text-xl font-bold truncate">{item.title}</p>
            {item.description ? (
              <p className="text-lg truncate">{item.description}</p>
            ) : (
              <br />
            )}
            <p className="text-gray-600 flex gap-1">
              quantity :
              {item.quantity ? (
                <span>{item.quantity}</span>
              ) : (
                <span className="text-red-500">sold out</span>
              )}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold flex gap-1">
              {numberFormat(item.price)} <p className="font-normal">฿</p>
            </span>
            <button
              className="bg-green-600 px-2 py-1 rounded-md hover:scale-105 shadow-md"
              onClick={handleAddToCart}
            >
              <ShoppingBasket className="text-white" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductCard;
