import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryProduct, setcategoryProduct] = useState([]);
  const [loading, setloading] = useState(false);

  const categoryLoading = new Array(13).fill(null)

  const fetchCategoryProduct = async () => {
    setloading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    console.log("productlist", dataResponse);
    setloading(false);
    setcategoryProduct(dataResponse.data);
    
    
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-11">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {loading ? (

            
                categoryLoading.map((el,index)=>{
                    return(
                        <div className="h-16 w-16 md:w-20 md:h-20 overflow-hidden bg-slate-200 animate-pulse" key={"categoryLoading" + index}>

                 </div>

                    )
                    
                })
            
            //query selector in tailwind md
          
        ) : (
          categoryProduct.map((product, index) => {
            return (
              <Link
                to={"/product-category?category=" + product?.category}
                className="cursor-pointer"
                key={product?.category+ index}
              >
                <div className="w-16 h-16 md:h-20 md:w-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center">
                  <img
                    src={product?.productImage[0]}
                    alt={product?.category}
                    className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                  />
                </div>
                <p className="text-center text-sm md:text-base capitalize ">
                  {product?.category}
                </p>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CategoryList;
