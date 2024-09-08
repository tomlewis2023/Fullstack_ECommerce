import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const productImageListLoading = new Array(4).fill(null);
  const { fetchUserAddtoCart } = useContext(Context);
  const navigate = useNavigate()

  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });
  const [zoomImage, setZoomImage] = useState(false);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.productDetails.url, {
        method: SummaryApi.productDetails.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: params?.id,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const dataResponse = await response.json();
      setData(dataResponse?.data);
      setActiveImage(dataResponse?.data.productImage[0]);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params.id]);

  const handleMouseSelect = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setZoomImageCoordinate({ x, y });
    },
    []
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };
 
  //buy add to cart method
  const handleAddToCart = async(e,id)=>{
     
    await addToCart(e,id)
    fetchUserAddtoCart()

  }

  const handleBuyProduct =async (e,id)=>{
    await addToCart(e,id)
    fetchUserAddtoCart()
    navigate("/cart")

  }


  return (
    <div className="container mx-auto pl-10 pt-12">
      <div className="min-h-[300px] flex flex-col lg:flex-row gap-4">
        {/* Product Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              alt="Product"
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />

            {/* Product Zoom */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0 ">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((_, index) => (
                  <div
                    className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                    key={index}
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data.productImage.map((imgUrl, index) => (
                  <div className="h-20 w-20 bg-slate-200 rounded p-1" key={imgUrl}>
                    <img
                      src={imgUrl}
                      alt={`Product Thumbnail ${index + 1}`}
                      className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                      onMouseEnter={() => handleMouseSelect(imgUrl)}
                      onClick={() => handleMouseSelect(imgUrl)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        {loading ? (
          <div className="grid gap-1 w-full">
            {/* Skeleton Loading */}
            {/* ... */}
          </div>
        ) : (
          data.productName && (  // Ensure data is loaded before rendering
            <div className="flex flex-col gap-1">
              <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
                {data?.brandName}
              </p>
              <h2 className="text-2xl lg:text-4xl font-medium">
                {data?.productName}
              </h2>
              <p className="capitalize text-slate-400 ">{data?.category}</p>

              <div className="text-red-600 flex items-center gap-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>

              <div className="flex item gap-2 text-2xl font-medium text-red-600 my-2 lg:text-3xl">
                <p className="text-red-600">
                  {displayINRCurrency(data.sellingPrice)}
                </p>
                <p className="text-slate-400 line-through">
                  {displayINRCurrency(data.price)}
                </p>
              </div>

              <div className="flex items-center gap-3 my-2">
                <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white" 
                onClick={(e)=>handleBuyProduct(e,data?._id)}
                >
                  Buy
                </button>
                <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium hover:bg-red-600 hover:text-white" onClick={(e)=>handleAddToCart(e,data?._id)}>
                  Add To Cart
                </button>
              </div>

              <div>
                <p className="text-slate-600 font-medium my-1">Description</p>
                <p>{data?.description}</p>
              </div>
            </div>
          )
        )}
      </div>

      {/* Recommended Products */}
      {data?.category && (
        <CategoryWiseProductDisplay
          category={data?.category}
          heading={"Recommended Products"}
        />
      )}
    </div>
  );
};

export default ProductDetails;
