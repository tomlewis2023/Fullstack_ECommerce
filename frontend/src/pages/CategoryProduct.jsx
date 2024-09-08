import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import VerticalCard from "../components/VerticalCard";
import SummaryApi from "../common";
// Search options

const CategoryProduct = () => {
  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  //category home page url
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll("category");

  const urlCategorylistObject = {};
  urlCategoryListinArray.forEach((el) => {
    urlCategorylistObject[el] = true;
  });

  const [selectCategory, setselectCategory] = useState(urlCategorylistObject);
  const [filtercategorylist, setfiltercategorylist] = useState([]);

  //sort state

  const [sort, setsort] = useState("");
  console.log(sort);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: filtercategorylist,
      }),
    });

    const dataresponse = await response.json();

    setdata(dataresponse?.data || []);
  };
  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;
    console.log("select cat", name, value, checked);
    setselectCategory((prev) => {
      return {
        ...prev,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, [filtercategorylist]);

  //selected category to array
  useEffect(() => {
    const arrayofCategory = Object.keys(selectCategory)
      .map((catkeyname) => {
        if (selectCategory[catkeyname]) {
          return catkeyname;
        }
        return null;
      })
      .filter((el) => el);

    setfiltercategorylist(arrayofCategory);

    //format for URL change when change on the checkbox
    const urlFormat = arrayofCategory.map((el, index) => {
      if (arrayofCategory.length - 1 === index) {
        return `category=${el}`;
      }

      return `category=${el}&&`;
    });

    navigate("/product-category?" + urlFormat.join(""));
  }, [selectCategory]);

  //dynamic routes from react router
  // params?.categoryName

  const handleonChangeSortby = (e) => {
    const { value } = e.target;
    setsort(value);

    if (value === "asc") {
      setdata((prev) => prev.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }
    if (value === "dsc") {
      setdata((prev) => prev.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  useEffect(() => {}, [sort]);

  return (
    <div className="container mx-auto py-4">
      {
        // desktop version

        <div className="hidden lg:grid grid-cols-[200px,1fr]">
          {/* left side */}
          <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll ">
            {/* sort by*/}
            <div className="">
              <h3 className="py-2 my-6 text-base uppercase font-medium text-slate-500 border border-slate-300 border-b pb-1 ">
                Sortby
              </h3>
              <form className="text-sm flex-col gap-2 py-2 ">
                <div className="flex items-center gap-3 ">
                  <input
                    type="radio"
                    name="sortBy"
                    value={"asc"}
                    onChange={handleonChangeSortby}
                    checked={sort === "asc"}
                  />
                  <label>Price - Low to High </label>
                </div>

                <div className="flex items-center gap-3 ">
                  <input
                    type="radio"
                    name="sortBy"
                    value={"dsc"}
                    onChange={handleonChangeSortby}
                    checked={sort === "dsc"}
                  />
                  <label>Price - High to Low </label>
                </div>
              </form>
            </div>

            {/* filter by */}

            <div className="">
              <h3 className="py-2 my-6 text-base uppercase font-medium text-slate-500 border border-slate-300 border-b pb-1 ">
                Category
              </h3>
              <form className="text-sm flex-col gap-2 py-2 ">
                {productCategory.map((categoryName, index) => {
                  return (
                    
                    <div className="flex items-center gap-3" key={index}>
                      <input
                        type="checkbox"
                        name={"category"}
                        id={categoryName?.value}
                        value={categoryName?.value}
                        checked={selectCategory[categoryName?.value]}
                        onChange={handleSelectCategory}
                      />
                      <label htmlFor={categoryName?.value}>
                        {categoryName?.label}
                      </label>
                    </div>
                  );
                })}
              </form>
            </div>
          </div>

          {/* right side (product) */}

          <div className="px-4">
            {/* home page each category */}

            <p className="font-medium text-slate-800 text-lg my-4">
              Search Results : {data.length}
            </p>

            {/* {params?.categoryName && (
              <CategoryWiseProductDisplay
                category={params?.categoryName}
                heading={"Recommended Product"}
              />
            )} */}

            <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-130px)]">
              {data.length !== 0 && (
                <VerticalCard data={data} loading={loading} />
              )}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default CategoryProduct;
