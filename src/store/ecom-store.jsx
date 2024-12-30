import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/category";
import { listProduct, searchFilters } from "../api/product";
import _ from "lodash";
const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],
  logout: () => {
    set({ user: null, token: null, categories: [], products: [], carts: [] });
  },
  actionAddToCart: (product) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, count: 1 }];

    // Unique
    const unique = _.unionWith(updateCart, _.isEqual);
    set({
      carts: unique,
    });
    // console.log("click zustand", updateCart);
    // console.log("click unique", unique);
  },
  actionUpdateQuantity: (productId, newQuantity) => {
    // console.log("click", productId, newQuantity);
    set((state) => ({
      carts: state.carts.map((item, index) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },
  actionGetTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  },
  actionRemoveProduct: (productId) => {
    // console.log("remove product", productId);
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));
  },
  actionLogin: async (form) => {
    const res = await axios.post(
      "https://ecom2024-api-ten.vercel.app/api/login",
      form
    );
    // console.log(res.data.token);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },
  getCategory: async () => {
    try {
      const res = await listCategory();
      // console.log(res);
      set({
        categories: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getProduct: async (count) => {
    try {
      const res = await listProduct(count);
      // console.log(res);
      set({
        products: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  actionSearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg);
      // console.log(res);
      set({
        products: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  clearCart: () => {
    set({ carts: [] });
  },
});

const usePersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage),
};
const useEcomStore = create(persist(ecomStore, usePersist));

export default useEcomStore;
