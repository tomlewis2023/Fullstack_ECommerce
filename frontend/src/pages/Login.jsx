import React, { useContext, useState } from "react";
import sign from "../asset/signin.gif";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Context from "../context";

const Login = () => {
  const [password, setpassword] = useState(false);
  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  //fetchuserdetails function from app.jsx via contextapi
  const { fetchUserDetails,fetchUserAddtoCart } = useContext(Context);

  //get sign up fields
  const onchangeHandler = (e) => {
    const { name, value } = e.target;

    setdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  //implement signin method

  const handlesubmit = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(SummaryApi.signin.url, {
      method: SummaryApi.signin.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi.message);

      navigate("/");
      fetchUserDetails();
      fetchUserAddtoCart()
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    } else {
      console.log("please check username and password");
      
    }
  };
  console.log(data);

  return (
    <section id="login">
      <div className="container w-full mx-auto p-4 my-8">
        <div className="bg-white py-5 w-full max-w-sm mx-auto">
          <div className=" w-20 h-20 mx-auto">
            <img src={sign} alt="" />
          </div>
          <form onSubmit={handlesubmit} className="p-4 flex flex-col gap-2">
            <div className="grid">
              <label> Email: </label>
              <div className="bg-slate-200 p-2 ">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={onchangeHandler}
                  placeholder="enter email"
                  className="w-full h-full bg-transparent"
                />
              </div>
            </div>
            <div>
              <label> Password: </label>
              <div className="bg-slate-200 p-2 flex">
                <input
                  type={password ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={onchangeHandler}
                  placeholder="enter password"
                  className="w-full h-full bg-transparent "
                />
                <div
                  className="text-xl"
                  onClick={() => setpassword((prev) => !prev)}
                >
                  <span>
                    {password ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forgot Password ?
              </Link>
            </div>
            <button className="bg-red-600 text-white mx-auto px-5 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all block mt-6">
              Login
            </button>
          </form>
          <p className="mx-4">
            Dont have account ?{" "}
            <Link
              to={"/signup"}
              className="text-red-600 hover:text-red-900 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
