import react, { useState, useEffect } from "react";
import { SquarePlus, Trash2 } from "lucide-react";
import {
  createCategory,
  listCategory,
  removeCategory,
} from "../../api/category";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";

const FormCategory = () => {
  const token = useEcomStore((state) => state.token);
  const [name, setName] = useState("");
  // const [categories, setCategories] = useState([]);
  const categories = useEcomStore((state) => state.categories);
  const getCategory = useEcomStore((state) => state.getCategory);
  useEffect(() => {
    getCategory(token);
  }, []);

  const handleRemove = async (id) => {
    // console.log(id);
    try {
      const res = await removeCategory(token, id);
      // console.log(res);
      toast.success(`Remove ${res.data.name} success`);
      getCategory(token);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ name });
    // console.log(token);
    if (!name) {
      return toast.warning(`Please fill data`);
    }
    try {
      const res = await createCategory(token, { name });
      // console.log(res.data.name);
      toast.success(`Add Category ${res.data.name} success`);
      getCategory(token);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto p-4 bg-white shadow-2xl rounded-lg">
      <h1 className="text-3xl">Category ManageMent</h1>
      <form className="my-4 flex" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          className="border rounded-sm"
          type="text"
        />
        <button className="bg-green-700 flex p-1 rounded-lg ml-3 text-white font-semibold hover:scale-105">
          Add <SquarePlus className=" ml-1" />
        </button>
      </form>
      <hr />
      <ul className="list-none">
        {categories.map((item, index) => (
          <li key={index} className="flex justify-between my-2 items-center">
            <span>{item.name}</span>{" "}
            <button
              onClick={() => handleRemove(item.id)}
              className="bg-red-500 flex text-white font-semibold p-1 rounded-lg hover:scale-105"
            >
              DELETE <Trash2 className="ml-1" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormCategory;
