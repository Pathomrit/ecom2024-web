import React from "react";
import useEcomStore from "../../store/ecom-store";
import { Plus, Minus, Trash, Delete } from "lucide-react";
import { Link } from "react-router-dom";
import { numberFormat } from "../../utils/number";
const CartCard = () => {
  const carts = useEcomStore((state) => state.carts);
  const actionUpdateQuantity = useEcomStore(
    (state) => state.actionUpdateQuantity
  );
  const actionRemoveProduct = useEcomStore(
    (state) => state.actionRemoveProduct
  );
  const actionGetTotalPrice = useEcomStore(
    (state) => state.actionGetTotalPrice
  );
  // console.log(carts);
  return (
    <div>
      <h1 className="text-2xl font-bold">Cart Product</h1>
      <div className="border p-2 mt-4">
        {carts.map((item, index) => (
          <div className="bg-white border p-2 mb-2" key={index}>
            <div className="flex justify-between">
              <div className="flex justify-center items-center gap-2">
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0].url}
                    className="w-16 h-16 bg-gray-200 rounded-md flex justify-center items-center text-sm"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex justify-center items-center text-sm">
                    No image
                  </div>
                )}

                <div className="flex flex-col text-sm">
                  <span className="font-bold">{item.title}</span>
                  <span>{item.description}</span>
                </div>
              </div>
              <div
                className="flex items-center justify-center cursor-pointer text-red-500"
                onClick={() => actionRemoveProduct(item.id)}
              >
                <Trash />
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <div className="border flex gap-2 justify-center items-center p-1">
                <button
                  className="bg-green-500 text-white rounded-md"
                  onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                >
                  <Plus />
                </button>
                <span className="text-lg">{item.count}</span>
                <button
                  className="bg-red-500 text-white rounded-md"
                  onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                >
                  <Minus />
                </button>
              </div>
              <div className="flex justify-center items-center">
                {numberFormat(item.price * item.count)} ฿
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between px-2 py-1 items-center">
          <span className="text-lg">Summary</span>
          <span className="text-xl">
            {numberFormat(actionGetTotalPrice())} ฿
          </span>
        </div>
        <div>
          <Link to={"/cart"}>
            <button className="mt-2 hover:bg-green-700 bg-green-600 text-white w-full  py-3 shadow-md rounded-md text-lg">
              Proceed with payment
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
