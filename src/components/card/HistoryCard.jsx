import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { dateFormat } from "../../utils/dateFormat";
import { numberFormat } from "../../utils/number";
const HistoryCard = () => {
  const [orders, setOrders] = useState([]);
  const token = useEcomStore((state) => state.token);
  useEffect(() => {
    handleGetOrders(token);
  }, []);
  const handleGetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        // console.log(res);
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-gray-200";
      case "Processing":
        return "bg-blue-200";
      case "Completed":
        return "bg-green-400";
      case "Cancel":
        return "bg-red-500";
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold">Order History</h1>
      {/* Header Table */}
      {orders?.map((item, index) => {
        // console.log(item);
        return (
          <div
            className="bg-gray-100 p-4 rounded-md shadow-md mt-6"
            key={index}
          >
            {/* Card */}
            <div>
              {/* Team Header */}
              <div className="flex justify-between items-center mb-2">
                {/* Left */}
                <div className="font-bold flex gap-1 text-lg items-end">
                  Order Date :
                  <h1 className="font-normal text-base">
                    {dateFormat(item.updatedAt)}
                  </h1>
                </div>
                {/* Right */}
                <div>
                  <p
                    className={`${getStatusColor(
                      item.orderStatus
                    )} px-2 py-1 rounded-full`}
                  >
                    {item.orderStatus}
                  </p>
                </div>
              </div>
              {/* Team Table */}
              <div>
                <table className="border w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="">Product</th>
                      <th>Price</th>
                      <th>Count</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.products?.map((product, index) => {
                      //   console.log(product);
                      return (
                        <tr key={index}>
                          <td className="border">{product.product.title}</td>
                          <td className="border text-center">
                            {numberFormat(product.product.price)}
                          </td>
                          <td className="border text-center">
                            {product.count}
                          </td>
                          <td className="border text-center">
                            {numberFormat(
                              product.product.price * product.count
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* Team Footer */}
              <div className="mt-2">
                <div className="text-right">
                  <p className="font-bold gap-1 text-normal">Total Amount</p>
                  <p>{numberFormat(item.cartTotal)} ฿</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryCard;
