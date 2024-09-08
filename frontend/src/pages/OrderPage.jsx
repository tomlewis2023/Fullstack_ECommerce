import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from "moment";
import displayINRCurrency from "../helpers/displayCurrency";

const OrderPage = () => {
  const [data, setdata] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: "include",
    });

    const responseData = await response.json();
    setdata(responseData.data);
    
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="p-4">
      {!data[0] && <p>No order available</p>}

      <div className="max-w-4xl mx-auto space-y-6">
        {data.map((item, index) => {
          return (
            <div key={item.userId + index} className="border p-4 rounded-lg shadow-sm">
              <p className="font-medium text-lg mb-4">
                {moment(item.createdAt).format("LL")}
              </p>
              <div className="border rounded-lg p-4 space-y-4">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {item?.productDetails.map((product, index) => {
                      return (
                        <div
                          key={product.productId + index}
                          className="flex gap-4 items-center bg-slate-100 p-3 rounded-md"
                        >
                          <img
                            src={product.image[0]}
                            alt={product.name}
                            className="w-28 h-28 bg-slate-200 object-contain rounded-md"
                          />
                          <div className="space-y-1">
                            <div className="font-medium text-lg text-ellipsis line-clamp-1">
                              {product.name}
                            </div>
                            <div className="flex items-center gap-5 mt-1">
                              <div className="text-lg text-red-500">
                                {displayINRCurrency(product.price)}
                              </div>
                              <p>Quantity: {product.quantity}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-lg font-medium mb-2">
                        Payment Details:
                      </div>
                      <p className="font-medium">
                        Payment Method:{" "}
                        {item.paymentDetails.payment_method_type[0]}
                      </p>
                      <p className="font-medium">
                        Payment Status: {item.paymentDetails.payment_status}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-lg font-medium mb-2">
                        Shipping Details:
                      </div>
                      {item.shipping_options.map((shipping, index) => {
                        return (
                          <p
                            key={shipping.shipping_rate}
                            className="font-medium"
                          >
                            Shipping Amount: {shipping.shipping_amount}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="font-semibold text-lg text-right">
                  Total Amount: {displayINRCurrency(item.totalAmount)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderPage;
