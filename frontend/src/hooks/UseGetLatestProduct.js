import { setLatestProduct } from "@/features/productSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const UseGetLatestProduct = async () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchLatestProduct = async () => {
      try {
        const response = await fetch(`/api/user/product/getlatest`, {
          method: "GET",
          headers: {
            "x-api-key": import.meta.env.VITE_API_KEY,
            "X-CSRF-Token": localStorage.getItem("csrfToken"),
          },
        });
        const responseData = await response.json();
        if (responseData.success) {
          dispatch(setLatestProduct(responseData.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchLatestProduct();
  }, [dispatch]);
};

export default UseGetLatestProduct;
