import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";

const Products = () => {
  const [openuploadProduct, setopenuploadProduct] = useState(false);
  const [allProduct, setallProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();
    console.log(dataResponse);

    setallProduct(dataResponse.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Product</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white py-1 px-3 rounded-full"
          onClick={() => setopenuploadProduct(true)}
        >
          Upload Products
        </button>
      </div>

      {/* all Product */}

      <div className="flex items-center gap-5 py-4 flex-wrap h-[calc(100vh-190px)] overflow-y-scroll ">
        {allProduct.map((product, index) => {

          return(
            <AdminProductCard  data={product} key={index + 'allProduct'} fetchdata = {fetchAllProduct}/>
         

          )
         
        })}
      </div>

      {/* upload product component */}

      {openuploadProduct && (
        <UploadProduct onClose={() => setopenuploadProduct(false)} fetchData={fetchAllProduct} />
      )}
    </div>
  );
};

export default Products;
