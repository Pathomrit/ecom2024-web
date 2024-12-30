import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, removeProduct } from "../../api/product";
import { toast } from "react-toastify";
import UploadFileImage from "./UploadFileImage";
import { Link } from "react-router-dom";
import { Delete, Pencil, PackagePlus } from "lucide-react";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateFormat";
const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};
const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const [dataForm, setDataForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [],
  });
  useEffect(() => {
    getCategory();
    getProduct(100);
  }, []);
  // console.log(products);
  const handleOnChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    // console.log(e.target.name, e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(dataForm);
    try {
      const res = await createProduct(token, dataForm);
      // console.log(res);
      toast.success(`Add Product ${res.data.title} success`);

      // Added by myself!
      getProduct();
      setDataForm(initialState);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id, title) => {
    if (window.confirm(`Confirm delete product : ${title}`)) {
      // console.log(id);
      try {
        const res = await removeProduct(token, id);
        console.log(res);
        toast.success(`Delete ${title} success`);
        getProduct();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="container mx-auto p-4 bg-white shadow-2xl rounded-lg">
      <h1 className="text-3xl">Add Data Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 m-4">
          <div>
            <h2 className="text-2xl my-2">Title</h2>
            <input
              className="border"
              value={dataForm.title}
              onChange={handleOnChange}
              placeholder="Title"
              name="title"
            />
            <h2 className="text-2xl my-2">Description</h2>
            <input
              className="border"
              value={dataForm.description}
              onChange={handleOnChange}
              placeholder="Description"
              name="description"
            />
          </div>
          <div>
            <h2 className="text-2xl my-2">Price</h2>
            <input
              type="number"
              className="border"
              value={dataForm.price}
              onChange={handleOnChange}
              placeholder="Price"
              name="price"
            />
            <h2 className="text-2xl my-2">Quantity</h2>
            <input
              type="number"
              className="border"
              value={dataForm.quantity}
              onChange={handleOnChange}
              placeholder="Quantity"
              name="quantity"
            />
            <h2 className="text-2xl my-2">Select</h2>
            <select
              className="border"
              name="categoryId"
              onChange={handleOnChange}
              required
              value={dataForm.categoryId}
            >
              <option value="" disabled>
                Please Select
              </option>
              {categories.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <hr />
        {/* Upload file Image */}
        <UploadFileImage dataForm={dataForm} setDataForm={setDataForm} />
        <button className="bg-green-600 flex p-1 rounded-md text-white text-lg items-center justify-center mb-4 hover:scale-105">
          Add Product <PackagePlus className="ml-1" />
        </button>
        <hr />
        <br />
        <table className="container">
          <thead className="border">
            <tr className="border">
              <th className="border" scope="col">
                No.
              </th>
              <th className="border" scope="col">
                Picture
              </th>
              <th className="border" scope="col">
                Title
              </th>
              <th className="border" scope="col">
                Description
              </th>
              <th className="border" scope="col">
                Price
              </th>
              <th className="border" scope="col">
                Quantity
              </th>
              <th className="border" scope="col">
                Sold
              </th>
              <th className="border" scope="col">
                UpdatedAt
              </th>
              <th className="border" scope="col">
                Manage
              </th>
            </tr>
          </thead>
          <tbody className="border text-center">
            {products.map((item, index) => {
              // console.log(item);
              return (
                <tr key={index}>
                  <th scope="row" className="border p-1">
                    {index + 1}
                  </th>
                  <td className="border px-2 py-4">
                    {item.images.length > 0 ? (
                      <img
                        className="w-24 h-24 rounded-md shadow-xl hover:scale-105"
                        src={item.images[0].url}
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center shadow-xl">
                        No Images
                      </div>
                    )}
                  </td>
                  <td className="border">{item.title}</td>
                  <td className="border">{item.description}</td>
                  <td className="border">{numberFormat(item.price)}</td>
                  <td className="border">{item.quantity}</td>
                  <td className="border">{item.sold}</td>
                  <td className="border">{dateFormat(item.updatedAt)}</td>
                  <td className="border">
                    <div className="flex flex-col gap-3">
                      <Link
                        className="bg-orange-400 rounded-md p-1 shadow-lg text-center flex items-center justify-center text-lg text-white hover:scale-105"
                        to={`/admin/product/${item.id}`}
                      >
                        Edit <Pencil className="ml-1 w-4" />
                      </Link>
                      <p
                        className="bg-red-500 rounded-md p-1 shadow-lg text-center cursor-pointer flex items-center justify-center text-lg text-white hover:scale-105"
                        onClick={() => handleDelete(item.id, item.title)}
                      >
                        Delete
                        <Delete className="ml-1 w-5" />
                      </p>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default FormProduct;
