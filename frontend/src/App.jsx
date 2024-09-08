import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import SummaryApi from "./common";
import Context from "./context";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";

const App = () => {
  //redux dispatch import
  const dispatch = useDispatch();
  const[cartProductCount,setCartProductCount] = useState(0)


  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      //set value redux via dispatch
      dispatch(setUserDetails(dataApi?.data));
    }
  };


  //retrieve from add to cart API
  const fetchUserAddtoCart = async () =>{

    const dataResponse = await fetch(SummaryApi.addtoCartProductCount.url, {
      method: SummaryApi.addtoCartProductCount.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();
    
    setCartProductCount(dataApi?.data?.count)
    
  };

  





  useEffect(() => {
    //user details
    fetchUserDetails();

    //user addtocart
    fetchUserAddtoCart()


  }, []);


  return (
    //context implemented
    <>
    
      <Context.Provider
        value={{
          fetchUserDetails, //user details fetch
          cartProductCount, // current user add to cart product count
          fetchUserAddtoCart

        }}
      >
        <ToastContainer 
        position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
};

export default App;
