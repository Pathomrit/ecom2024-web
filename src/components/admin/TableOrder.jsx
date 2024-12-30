import React, { useEffect, useState } from "react";
import { changeOrderStatus, getOrderAdmin } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateFormat";
const TableOrder = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // code body
    handleGetOrder(token);
  }, []);
  const handleGetOrder = (token) => {
    getOrderAdmin(token)
      .then((res) => {
        // console.log(res);
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    // console.log(orderId, orderStatus);
    changeOrderStatus(token, orderId, orderStatus)
      .then((res) => {
        console.log(res);
        toast.success("Update Status Success");
        handleGetOrder(token);
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
    <div className="container mx-auto p-4 bg-white shadow-2xl rounded-lg">
      <div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 border">
              <th className="py-4 px-2">No.</th>
              <th>Username</th>
              <th>Date</th>
              <th className="px-14">Product</th>
              <th>Total</th>
              <th className="px-10">Status</th>
              <th>Status Update</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((item, index) => {
              // console.log(item);
              return (
                <tr key={index} className="border-b-2 text-center">
                  <td>{index + 1}</td>
                  <td className="text-left">
                    <p>{item.orderedBy.email}</p>
                    <p>{item.orderedBy.address}</p>
                  </td>
                  <td>{dateFormat(item.createdAt)}</td>
                  <td className="px-2 py-4">
                    {item.products?.map((product, index) => {
                      // console.log(product);
                      return (
                        <div key={index} className="flex gap-1 items-center">
                          <p className="text-lg">{product.product.title}</p>
                          <p className="text-sm">
                            {product.count} x {numberFormat(product.price)}
                          </p>
                        </div>
                      );
                    })}
                  </td>
                  <td>{numberFormat(item.cartTotal)}</td>
                  <td>
                    <span
                      className={`${getStatusColor(
                        item.orderStatus
                      )} px-2 py-1 rounded-full`}
                    >
                      {item.orderStatus}
                    </span>
                  </td>
                  <td>
                    <select
                      value={item.orderStatus}
                      onChange={(e) =>
                        handleChangeOrderStatus(token, item.id, e.target.value)
                      }
                    >
                      <option>Not Process</option>
                      <option>Processing</option>
                      <option>Completed</option>
                      <option>Cancel</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOrder;
