import React from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/cartSlice";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div className="p-4 rounded-xl flex flex-col justify-between w-[32%] shadow-xl">
      <div className="flex flex-col">
        <img
          src={product.picture}
          alt={product.title}
          className=" w-full h-48 object-cover mb-4 rounded"
        />
        <h2 className="text-lg font-semibold mb-2 font-header">
          {product.title}
        </h2>
        <p className=" text-sm text-gray-500 mb-2">Brand: {product.brand}</p>
        <p className=" text-sm text-gray-400 mb-2">
          Category: {product.category}
        </p>
        <p className=" text-sm mb-2">{product.description}</p>
        <p className=" text-lg font-bold mb-2">${product.price}</p>
        <p className=" text-sm text-yellow-500">Rating: {product.rating}⭐</p>
      </div>

      <button
        className="mt-4 bg-basic-red text-white py-2 px-4 rounded hover:bg-dark-red"
        onClick={() => {
          dispatch(addProduct(product));
          console.log("Product added in cart!");
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
