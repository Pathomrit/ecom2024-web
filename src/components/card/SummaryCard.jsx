import React from "react";
import useEcomStore from "../../store/ecom-store";
import { useState, useEffect } from "react";
import { listUserCart, saveAddress } from "../../api/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../../utils/number";
const SummaryCard = () => {
  const cart = useEcomStore((state) => state.carts);
  const token = useEcomStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const navigate = useNavigate();
  // console.log(products);
  useEffect(() => {
    handleGetUserCart(token);
  }, []);
  const handleGetUserCart = (token) => {
    listUserCart(token)
      .then((res) => {
        // console.log(res);
        setProducts(res.data.products);
        setCartTotal(res.data.cartTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSaveAddress = () => {
    // console.log(address);
    if (!address) {
      return toast.warning("Please fill address");
    }
    saveAddress(token, address)
      .then((res) => {
        console.log(res);
        toast.success(`${res.data.message}`);
        setAddressSaved(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleGoToPayment = () => {
    if (!addressSaved) {
      return toast.warning("Please fill address");
    }
    navigate("/user/payment");
  };
  return (
    <div className="mx-auto">
      <div className="flex flex-wrap flex-col gap-10 md:grid md:grid-cols-[65%_30%] md:gap-10 ">
        {/* Left */}
        <div className="">
          <div className="bg-gray-100 p-4 rounded-md border shadow-md space-y-4">
            <h1 className="text-2xl font-bold">Address</h1>
            <textarea
              className="w-full px-2 py-1"
              placeholder="Please fill address"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <button
              className="bg-green-500 text-white w-full rounded-md p-2 hover:bg-green-600"
              onClick={handleSaveAddress}
            >
              Save Address
            </button>
          </div>
        </div>
        {/* Right */}
        <div className="">
          <div className="bg-gray-100 p-4 rounded-md border shadow-md space-y-4">
            <h1 className="text-2xl font-bold">Summary</h1>
            {/* Items List */}
            <div>
              {products?.map((item, index) => {
                return (
                  <div key={index}>
                    <div>
                      <p className="font-semibold">
                        Title : {item.product.title}
                      </p>
                      <div className=" flex justify-between">
                        <p>
                          Quantity: {item.count} X{" "}
                          {numberFormat(item.product.price)}
                        </p>
                        <p className="text-red-500 font-bold">
                          {numberFormat(item.product.price * item.count)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <hr className="mt-4 mb-4" />
              <div className="flex justify-between">
                <p>Shipping costs</p>
                <p>0.00</p>
              </div>
              <div className="flex justify-between">
                <p>discount</p>
                <p>0.00</p>
              </div>
              <hr className="mt-4 mb-4" />
              <div className="flex justify-between items-center">
                <p>Net Total</p>
                <p className="text-red-500 font-semibold">
                  {numberFormat(cartTotal)}
                </p>
              </div>
              <button
                onClick={handleGoToPayment}
                className="bg-red-500 w-full mt-4 rounded-md p-1 text-white font-semibold"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
