import React from "react";
import SUCCESSIMG from "../asset/success.gif";
import {Link} from "react-router-dom"

const Success = () => {
  return (
    <div className="bg-white w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded">
      <img src={SUCCESSIMG} 
      width={250}
      height={250}/>
      <p className="text-green-500 font-bold text-xl ">Payment Successfull</p>
      <Link to={"/order"} className="p-2 mt-5 px-3 border-2 border-green-500 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white">View Order</Link>
    </div>
  );
};

export default Success;
