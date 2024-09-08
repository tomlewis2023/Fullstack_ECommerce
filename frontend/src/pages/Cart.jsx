import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      });

      const responseData = await response.json();
      if (responseData.success) {
        setData(responseData.data);
      } else {
        console.error("Failed to fetch cart products:", responseData.message);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
    }
  };
  //cart performance tweek
  const handleloading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);

    handleloading();
    setLoading(false);
  }, []);

  // Increase quantity of cart item
  const increaseQty = async (id, qty) => {
    try {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id, // Ensure the product ID is included in the request body
          quantity: qty + 1, // Increase quantity by 1
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData(); // Refresh cart data after successful update
      } else {
        console.error(
          "Failed to update product quantity:",
          responseData.message
        );
      }
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  };

  // Decrease quantity of cart item
  const DecreaseQty = async (id, qty) => {
    if (qty >= 2) {
      try {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
          method: SummaryApi.updateCartProduct.method,
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            _id: id, // Ensure the product ID is included in the request body
            quantity: qty - 1, // Increase quantity by 1
          }),
        });

        const responseData = await response.json();

        if (responseData.success) {
          fetchData(); // Refresh cart data after successful update
        } else {
          console.error(
            "Failed to update product quantity:",
            responseData.message
          );
        }
      } catch (error) {
        console.error("Error updating product quantity:", error);
      }
    }
  };

  //Delete cart method

  const deleteCartProduct = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteCartProduct.url, {
        method: SummaryApi.deleteCartProduct.method,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id, // Ensure the product ID is included in the request body
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData(); // Refresh cart data after successful update
        context.fetchUserAddtoCart();
      } else {
        console.error("Failed to delete :", responseData.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Total quantity
  const totalqty = data.reduce(
    (prevvalue, currvalue) => prevvalue + currvalue.quantity,
    0
  );

  const totalPrice = data.reduce(
    (prev, curr) => prev + curr?.quantity * curr?.productId?.sellingPrice,
    0
  );
  //Stripe Payment

  const handlepayment = async () => {
    
    const stripePromise = await loadStripe(
      import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY
    );

    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        cartItems: data,
      }),
    });

    const responseData = await response.json();
    if (responseData?.id) {
      stripePromise.redirectToCheckout({ sessionId: responseData.id });
    }
    console.log("payment", responseData);
  };

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5"> No data </p>
        )}
      </div>

      {/* View product */}
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((el, index) => (
                <div
                  key={index}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                ></div>
              ))
            : data.map((product) => (
                <div
                  key={product?._id}
                  className="w-full bg-white h-32 my-5 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                >
                  <div className="w-32 h-32 bg-slate-200">
                    <img
                      src={product?.productId?.productImage[0]}
                      alt={product?.productId?.productName}
                      className="w-full h-full object-scale-down mix-blend-multiply"
                    />
                  </div>
                  <div className="px-4 py-2 relative">
                    {/* Delete product */}
                    <div
                      className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer "
                      onClick={() => deleteCartProduct(product?._id)}
                    >
                      <MdDelete />
                    </div>

                    <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                      {product?.productId?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.productId?.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-red-600 font-medium">
                        {displayINRCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="text-slate-600 font-semibold text=lg">
                        {displayINRCurrency(
                          product?.productId?.sellingPrice * product?.quantity
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-1">
                      <button
                        className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                        onClick={() =>
                          DecreaseQty(product?._id, product?.quantity)
                        }
                      >
                        -
                      </button>
                      <span>{product?.quantity}</span>
                      <button
                        className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                        onClick={() =>
                          increaseQty(product?._id, product?.quantity)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        {/* Summary */}

        {/* display summary if items available */}

        {data[0] && (
          <div className="mt-5 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className="h-36 bg-slate-200 border-slate-300 animate-pulse">
                Total
              </div>
            ) : (
              <div className="h-36 bg-white">
                <h2 className="text-white bg-red-600 px-4 py-2 my-5">
                  Summary
                </h2>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Quantity</p>
                  <p> {totalqty}</p>
                </div>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Total Price</p>
                  <p>{displayINRCurrency(totalPrice)}</p>
                </div>

                <button
                  className="bg-blue-600 p-2 text-white w-full"
                  onClick={handlepayment}
                >
                  Payment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
