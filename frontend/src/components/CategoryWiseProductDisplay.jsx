import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const CategoryWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null); // Skeleton effect

  const { fetchUserAddtoCart } = useContext(Context);

  //update add to cart
  const handleaddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddtoCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data || []);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all">
        {loading
          ? loadingList.map((product, index) => {
              return (
                <div
                  key={index}
                  className="w-full min-w-[290px] md:min-w-[320px] max-w-[290px] md:max-w-[320px] bg-white rounded-sm shadow"
                >
                  <div className="bg-slate-200 h-48 p-4 flex justify-center items-center animate-pulse"></div>
                  <div className="p-4 grid gap-3">
                    <h2 className="font-medium md:text-lg text-base text-ellipsis line-clamp-1 text-black p-1 animate-pulse rounded bg-slate-200"></h2>
                    <p className="capitalize text-slate-500 p-1 animate-pulse rounded bg-slate-200"></p>
                    <div className="flex gap-3">
                      <p className="text-red-600 font-medium p-1 animate-pulse rounded bg-slate-200"></p>
                      <p className="text-slate-500 line-through p-1 animate-pulse rounded bg-slate-200"></p>
                    </div>
                    <button className=" text-sm text-white px-3 py-0.5 rounded-full bg-slate-200 w-full"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  to={`/product/${product?._id}`}
                  key={index}
                  className="w-full min-w-[290px] md:min-w-[320px] max-w-[290px] md:max-w-[320px] bg-white rounded-sm shadow"
                >
                  <div className="bg-slate-200 h-48 p-4 flex justify-center items-center">
                    <img
                      src={product?.productImage[0]}
                      className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                    />
                  </div>
                  <div className="p-4 grid gap-3">
                    <h2 className="font-medium md:text-lg text-base text-ellipsis line-clamp-1 text-black">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.category}
                    </p>
                    <div className="flex gap-3">
                      <p className="text-red-600 font-medium">
                        {displayINRCurrency(product?.sellingPrice)}
                      </p>
                      <p className="text-slate-500 line-through">
                        {displayINRCurrency(product?.price)}
                      </p>
                    </div>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-sm text-white px-3 py-0.5 rounded-full"
                      onClick={(e) => handleaddToCart(e, product?._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
