import React, { useState, useEffect } from "react";
import {
  getListAllUsers,
  changeUserStatus,
  changeUserRole,
} from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
const TableUsers = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    handleGetListAllUsers(token);
  }, []);
  const handleGetListAllUsers = (token) => {
    getListAllUsers(token)
      .then((res) => {
        // console.log(res);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangeUserStatus = (userId, userStatus) => {
    // console.log(userId, userStatus);
    const value = {
      id: userId,
      enabled: !userStatus,
    };
    changeUserStatus(token, value)
      .then((res) => {
        console.log(res);
        toast.success("Update Status Success");
        handleGetListAllUsers(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangeUserRole = (userId, userRole) => {
    // console.log(userId, userStatus);
    const value = {
      id: userId,
      role: userRole,
    };
    changeUserRole(token, value)
      .then((res) => {
        console.log(res);
        toast.success("Update Role Success");
        handleGetListAllUsers(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-2xl rounded-lg">
      <table className="w-full text-center">
        <thead>
          <tr className="bg-gray-200 border">
            <th className="py-4 px-2">No.</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Change Status</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((item, index) => {
            // console.log(item.enabled);
            return (
              <tr key={index}>
                <td className="py-4 px-2">{index + 1}</td>
                <td>{item.email}</td>
                <td>
                  <select
                    value={item.role}
                    onChange={(e) =>
                      handleChangeUserRole(item.id, e.target.value)
                    }
                  >
                    <option>user</option>
                    <option>admin</option>
                  </select>
                </td>
                <td
                  className={`${
                    item.enabled ? "text-green-600" : "text-red-500"
                  } font-semibold`}
                >{`${item.enabled ? "Active" : "Inactive"}`}</td>
                <td>
                  <button
                    onClick={() =>
                      handleChangeUserStatus(item.id, item.enabled)
                    }
                    className={`p-1 px-2 rounded-md shadow-md text-white ${
                      item.enabled ? "bg-red-500" : "bg-green-600"
                    }`}
                  >
                    {item.enabled ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableUsers;
