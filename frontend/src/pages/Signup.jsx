import React, { useState } from "react";
import sign from "../asset/signin.gif";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import imagetobase64 from "../helpers/imagetobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [password, setPassword] = useState(false);
  const [conpassword, setConPassword] = useState(false);
  const [data, setData] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
    profilepic: "",
    shippingAddress: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });

  const navigate = useNavigate();

  // Handle input changes
  const onchangeHandler = (e) => {
    const { name, value } = e.target;

    // Handle shipping address separately
    if (name.includes("shippingAddress.")) {
      const field = name.split(".")[1];
      setData((prev) => ({
        ...prev,
        shippingAddress: {
          ...prev.shippingAddress,
          [field]: value,
        },
      }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Convert image to Base64
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imagetobase64(file);

    setData((prev) => ({
      ...prev,
      profilepic: imagePic,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.cpassword) {
      const response = await fetch(SummaryApi.signup.url, {
        method: SummaryApi.signup.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const dataApi = await response.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/signin");
      } else {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Please check password and confirm password.");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
          <img src={data.profilepic || sign} alt="Profile" className="w-full" />
          <label>
            <div className="text-xs bg-gray-300 py-2 text-center cursor-pointer absolute bottom-0 w-full">
              Upload Photo
            </div>
            <input type="file" className="hidden" onChange={handleUploadPic} />
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block">Name:</label>
            <input
              type="text"
              name="fname"
              value={data.fname}
              onChange={onchangeHandler}
              placeholder="Enter Name"
              className="w-full p-2 bg-gray-200 rounded"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block">Email:</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={onchangeHandler}
              placeholder="Enter Email"
              className="w-full p-2 bg-gray-200 rounded"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block">Password:</label>
            <div className="flex items-center bg-gray-200 p-2 rounded">
              <input
                type={password ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={onchangeHandler}
                placeholder="Enter Password"
                className="w-full bg-transparent"
              />
              <button type="button" onClick={() => setPassword(!password)}>
                {password ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block">Confirm Password:</label>
            <div className="flex items-center bg-gray-200 p-2 rounded">
              <input
                type={conpassword ? "text" : "password"}
                name="cpassword"
                value={data.cpassword}
                onChange={onchangeHandler}
                placeholder="Enter Confirm Password"
                className="w-full bg-transparent"
              />
              <button type="button" onClick={() => setConPassword(!conpassword)}>
                {conpassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </button>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="font-bold">Shipping Address</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <label className="block">Street:</label>
                <input
                  type="text"
                  name="shippingAddress.street"
                  value={data.shippingAddress.street}
                  onChange={onchangeHandler}
                  placeholder="Street Address"
                  className="w-full p-2 bg-gray-200 rounded"
                />
              </div>

              <div>
                <label className="block">City:</label>
                <input
                  type="text"
                  name="shippingAddress.city"
                  value={data.shippingAddress.city}
                  onChange={onchangeHandler}
                  placeholder="City"
                  className="w-full p-2 bg-gray-200 rounded"
                />
              </div>

              <div>
                <label className="block">State:</label>
                <input
                  type="text"
                  name="shippingAddress.state"
                  value={data.shippingAddress.state}
                  onChange={onchangeHandler}
                  placeholder="State"
                  className="w-full p-2 bg-gray-200 rounded"
                />
              </div>

              <div>
                <label className="block">Zip Code:</label>
                <input
                  type="text"
                  name="shippingAddress.zip"
                  value={data.shippingAddress.zip}
                  onChange={onchangeHandler}
                  placeholder="Zip Code"
                  className="w-full p-2 bg-gray-200 rounded"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block">Country:</label>
                <input
                  type="text"
                  name="shippingAddress.country"
                  value={data.shippingAddress.country}
                  onChange={onchangeHandler}
                  placeholder="Country"
                  className="w-full p-2 bg-gray-200 rounded"
                />
              </div>
            </div>
          </div>

          {/* Signup Button */}
          <button className="w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition">
            Signup
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-red-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
