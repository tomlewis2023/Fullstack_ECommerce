import React, { useEffect, useState } from "react";
import moment from "moment";
import displayINRCurrency from "../helpers/displayCurrency";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/all-orders", {
        method: "GET",
        credentials: "include", // Required for authentication cookies
      });

      const responseData = await response.json();
      if (responseData.success) {
        console.log("Fetched Orders:", responseData.data);
        setOrders(responseData.data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="p-4">
      {!orders.length && <p className="text-center text-gray-500">No orders available</p>}
      <div className="max-w-4xl mx-auto space-y-6">
        {orders.map((order, index) => (
          <div key={order._id || index} className="border p-4 rounded-lg shadow-sm">
            <p className="font-medium text-lg mb-4">
              Order Date: {moment(order.createdAt).format("LL")}
            </p>

            {/* User Details */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-medium mb-2">User Details:</div>
              {order.user ? (
                <div>
                  <p>Name: {order.user.fname || "N/A"}</p>
                  <p>Email: {order.user.email || "N/A"}</p>
                </div>
              ) : (
                <p className="text-red-500">User details not available</p>
              )}
            </div>

            <div className="border rounded-lg p-4 space-y-4">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Product Details */}
                <div className="space-y-4">
                  {order?.productDetails?.length > 0 ? (
                    order.productDetails.map((product, idx) => (
                      <div key={product.productId || idx} className="flex gap-4 items-center bg-slate-100 p-3 rounded-md">
                        <img
                          src={product?.image?.[0] || "/placeholder.jpg"} // Fallback for missing image
                          alt={product?.name || "Product Image"}
                          className="w-28 h-28 bg-slate-200 object-contain rounded-md"
                        />
                        <div className="space-y-1">
                          <div className="font-medium text-lg text-ellipsis line-clamp-1">
                            {product?.name || "Unknown Product"}
                          </div>
                          <div className="flex items-center gap-5 mt-1">
                            <div className="text-lg text-red-500">
                              {displayINRCurrency(product?.price || 0)}
                            </div>
                            <p>Quantity: {product?.quantity || 0}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No products in this order</p>
                  )}
                </div>

                {/* Payment & Shipping Details */}
                <div className="space-y-4">
                  {/* Payment Details */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-lg font-medium mb-2">Payment Details:</div>
                    <p className="font-medium">
                      Payment Method: {order.paymentDetails?.payment_method_type?.[0] || "N/A"}
                    </p>
                    <p className="font-medium">
                      Payment Status: {order.paymentDetails?.payment_status || "N/A"}
                    </p>
                  </div>

                  {/* Shipping Address */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-lg font-medium mb-2">Shipping Address:</div>
                    {order.user?.shippingAddress ? (
                      <div className="font-medium">
                        <p>Street: {order.user.shippingAddress.street || "N/A"}</p>
                        <p>City: {order.user.shippingAddress.city || "N/A"}</p>
                        <p>State: {order.user.shippingAddress.state || "N/A"}</p>
                        <p>Zip: {order.user.shippingAddress.zip || "N/A"}</p>
                        <p>Country: {order.user.shippingAddress.country || "N/A"}</p>
                      </div>
                    ) : (
                      <p className="text-red-500">No shipping address available</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="font-semibold text-lg text-right">
                Total Amount: {displayINRCurrency(order.totalAmount || 0)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
