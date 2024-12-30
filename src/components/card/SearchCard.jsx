import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { numberFormat } from "../../utils/number";
const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const products = useEcomStore((state) => state.products);
  const actionSearchFilters = useEcomStore(
    (state) => state.actionSearchFilters
  );
  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);
  useEffect(() => {
    getCategory();
  }, []);
  // console.log(categories);
  const [price, setPrice] = useState([0, 30000]);
  const [ok, setOk] = useState(false);

  // Search Text
  //   console.log(text);
  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text });
      } else {
        getProduct();
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);
  // Search Category

  const handleCheck = (e) => {
    // console.log(e.target.value);
    const inCheck = e.target.value; // Value tick
    const inState = [...categorySelected]; // [] Array empty
    const findCheck = inState.indexOf(inCheck); // if not found return -1

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelected(inState);

    if (inState.length > 0) {
      actionSearchFilters({ category: inState });
    } else {
      getProduct();
    }
  };
  // console.log(categorySelected);

  // Search price
  useEffect(() => {
    actionSearchFilters({ price });
  }, [ok]);
  const handlePrice = (value) => {
    // console.log(value);
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Search Product</h1>
      {/* Search By Text */}
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        className="rounded-md border w-full mb-4 px-2"
        placeholder="Search. . ."
      ></input>
      <hr />
      {/* Search By Category */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Category</h1>
        <div>
          {categories.map((item, index) => (
            <div className="flex gap-2" key={index}>
              <input type="checkbox" onChange={handleCheck} value={item.id} />
              <label>{item.name}</label>
            </div>
          ))}
        </div>
      </div>
      <hr />
      {/* Search By Price */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Search Price</h1>
        <div className="flex justify-between mb-2">
          <span>Min: {numberFormat(price[0])}</span>
          <span>Max: {numberFormat(price[1])}</span>
        </div>
        <div>
          <Slider
            onChange={handlePrice}
            range
            min={0}
            max={100000}
            defaultValue={[0, 30000]}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
