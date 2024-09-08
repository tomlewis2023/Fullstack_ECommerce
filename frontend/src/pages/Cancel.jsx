import React from 'react'
import CANCELIMG from "../asset/cancel.jpg"
import {Link} from "react-router-dom"

const Cancel = () => {
  return (
    <div className="bg-white w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded">
      <img src={CANCELIMG} 
      width={250}
      height={250}/>
      <p className="text-red-500 font-bold text-xl ">Payment Cancel</p>
      <Link to={"/cart"} className="p-2 mt-5 px-3 border-2 border-red-500 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white">Go to Cart</Link>
    </div>
  )
}

export default Cancel