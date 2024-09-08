import React, { useState } from "react";
import sign from "../asset/signin.gif";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import imagetobase64 from "../helpers/imagetobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const Signup = () => {
  const [password, setpassword] = useState(false);
  const [conpassword, setconpassword] = useState(false);
  const [data, setdata] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
    profilepic: "",
  });

  const navigate = useNavigate();
  //signup method
  const onchangeHandler = (e) => {
    const { name, value } = e.target;

    setdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //image to base64 conv method

  const handleuploadpic = async (e) => {
    const file = e.target.files[0];
    const imagepic = await imagetobase64(file);

    setdata((prev) => {
      return {
        ...prev,
        profilepic: imagepic,
      };
    });
  };

  //Signup submit method

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.cpassword) {
      const dataResponse = await fetch(SummaryApi.signup.url, {
        method: SummaryApi.signup.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/signin");
      }
      if (dataApi.err) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("please check password and confirm password");
    
    }
  };

  return (
    <section id="login">
      <div className="container w-full mx-auto p-4 my-8">
        <div className="bg-white py-5 w-full max-w-sm mx-auto">
          <div className=" w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div className="">
              <img src={data.profilepic || sign} alt="" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-slate-200 bg-opacity-80 py-4 cursor-pointer pt-2 text-center absolute bottom-0 w-full ">
                  upload photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleuploadpic}
                />
              </label>
            </form>
          </div>
          <form onSubmit={handlesubmit} className="p-4 flex flex-col gap-2">
            <div className="grid">
              <label> Name: </label>
              <div className="bg-slate-200 p-2 ">
                <input
                  type="text"
                  name="fname"
                  value={data.fname}
                  onChange={onchangeHandler}
                  placeholder="enter Name"
                  className="w-full h-full bg-transparent"
                />
              </div>
            </div>

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
            </div>

            <div>
              <label> Confirm Password: </label>
              <div className="bg-slate-200 p-2 flex">
                <input
                  type={conpassword ? "text" : "password"}
                  name="cpassword"
                  value={data.cpassword}
                  onChange={onchangeHandler}
                  placeholder="enter confirm password"
                  className="w-full h-full bg-transparent "
                />
                <div
                  className="text-xl"
                  onClick={() => setconpassword((prev) => !prev)}
                >
                  <span>
                    {conpassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-red-600 text-white mx-auto px-5 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all block mt-6">
              Signup
            </button>
          </form>
          <p className="mx-4">
            Already have account ?{" "}
            <Link
              to={"/signin"}
              className="text-red-600 hover:text-red-900 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
