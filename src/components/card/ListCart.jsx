import React from "react";
import { List } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link, useNavigate } from "react-router-dom";
import { createUserCart } from "../../api/user";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
const ListCart = () => {
  const navigate = useNavigate();
  const cart = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);
  const actionGetTotalPrice = useEcomStore(
    (state) => state.actionGetTotalPrice
  );
  const handleSaveCart = async () => {
    await createUserCart(token, { cart })
      .then((res) => {
        // console.log(res);
        toast.success("Add to cart success", { position: "top-center" });
        navigate("/checkout");
      })
      .catch((err) => {
        console.log(err);
        toast.warning(err.response.data.message);
      });
  };
  return (
    <div className="bg-gray-100 rounded-md p-4">
      {/* Header */}
      <div>
        <p className="flex text-2xl font-bold items-center">
          <List className="mr-4 size-8" />
          List Product
          {cart.length === 1 || cart.length === 0
            ? ` ${cart.length} item`
            : ` ${cart.length} items`}
        </p>
      </div>
      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-[70%_25%] md:gap-10 xl:grid-cols-[80%_15%] xl:gap-10">
        {/* Left */}
        {cart.length === 0 ? (
          <div className="flex items-center justify-center text-xl font-light">
            Please Add Product
          </div>
        ) : (
          <div>
            {cart.map((item, index) => {
              return (
                <div
                  className="bg-white border p-2 mb-2 mt-2 rounded-md"
                  key={index}
                >
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
                        <span>
                          {numberFormat(item.price)} x {item.count}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      {numberFormat(item.price * item.count)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Right */}
        <div className="bg-white p-2 rounded-md mt-5 md:mt-0 xl:mt-0">
          <div className="text-2xl font-bold">Total</div>
          <div className="flex justify-between mt-2 items-center">
            <p>Total net :</p>
            <span className="text-2xl flex gap-1">
              {numberFormat(actionGetTotalPrice())}
              <span className="font-light">฿</span>
            </span>
          </div>
          <div className="flex flex-col gap-2 mt-5">
            {user ? (
              <Link>
                <button
                  disabled={cart.length < 1}
                  className="bg-green-500 w-full rounded-md p-1 md:p-2 xl:p-2 text-white font-semibold"
                  onClick={handleSaveCart}
                >
                  Order products
                </button>
              </Link>
            ) : (
              <Link to={"/login"}>
                <button className="bg-blue-400 w-full rounded-md p-1 md:p-2 xl:p-2  text-white font-semibold">
                  Login
                </button>
              </Link>
            )}
            <Link to={"/shop"}>
              <button className="bg-orange-400 w-full rounded-md  p-1 md:p-2 xl:p-2 text-white font-semibold">
                Edit
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCart;
