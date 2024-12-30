import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { useParams, useNavigate, data } from "react-router-dom";
import {
  createProduct,
  readProduct,
  listProduct,
  updateProduct,
} from "../../api/product";
import { toast } from "react-toastify";
import UploadFileImage from "./UploadFileImage";
import { PackagePlus } from "lucide-react";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};
const FormEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const [dataForm, setDataForm] = useState(initialState);
  useEffect(() => {
    getCategory();
    fetchProduct(token, id, dataForm);
  }, []);
  // console.log(products);
  const fetchProduct = async (token, id, dataForm) => {
    try {
      const res = await readProduct(token, id, dataForm);
      console.log("res from backend", res);
      setDataForm(res.data);
    } catch (error) {
      console.log("Err fetch data", error);
    }
  };
  console.log(dataForm);
  const handleOnChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    // console.log(e.target.name, e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(dataForm);
    try {
      const res = await updateProduct(token, id, dataForm);
      // console.log(res);
      toast.success(`Add Product ${res.data.title} success`);
      navigate("/admin/product");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto p-4 bg-white shadow-2xl rounded-lg">
      <form onSubmit={handleSubmit}>
        <h1 className="text-3xl">Edit Product</h1>
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
              className="border "
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
          Update Product <PackagePlus className="ml-1" />
        </button>
        <hr />
        <br />
      </form>
    </div>
  );
};

export default FormEditProduct;
