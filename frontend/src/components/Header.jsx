import React, { useContext, useState } from "react";
import img from "../asset/logo.png";
import { GrSearch } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";
import { TbBrandElectronicArts } from "react-icons/tb";

const Header = () => {
  // Import initial state redux
  const user = useSelector((state) => state?.user?.user);

  // Import dispatch redux
  const dispatch = useDispatch();
  // State menu
  const [menudisplay, setmenudisplay] = useState(false);

  // Import context add to cart
  const context = useContext(Context);

  // Navigate for search
  const navigate = useNavigate();

  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setsearch] = useState(searchQuery);

  // Logout method
  const handlelogout = async () => {
    const fetchdata = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    const data = await fetchdata.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  // Search function
  const handleSearch = (e) => {
    const { value } = e.target;
    setsearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="h-12 shadow-md bg-white fixed w-full z-50 pb-2">
      <div className="h-full container mx-auto flex items-center px-4 my-2 justify-between">
        <div className="h-full">
          <Link to={"/"}>
            <div className="flex items-center hover:bg-red-600 bg-red-400 text-lg text-white rounded p-1">
              <p className="font-semibold">TOM@EKART</p>
              <TbBrandElectronicArts />
            </div>
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="relative flex justify-center">
            {/* User not logged in - do not display display icon */}
            {user?._id && (
              <div
                className="text-3xl cursor-pointer"
                onClick={() => setmenudisplay((prev) => !prev)}
              >
                {user?.profilepic ? (
                  <img
                    src={user?.profilepic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.fname}
                  />
                ) : (
                  <p className="font-semibold text-lg capitalize">
                    {user?.fname}
                  </p>
                )}
              </div>
            )}

            {menudisplay && (
              <div
                className="absolute bg-white bottom-0 top-12 right-0 h-fit p-4 shadow-lg rounded w-48"
                onClick={() => setmenudisplay((prev) => !prev)}
              >
                <nav className="flex flex-col">
                  {/* Display admin panel only when admin logs in */}
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"admin-panel"}
                      className="widespace-nowrap hover:bg-slate-100 p-3"
                    >
                      Admin
                    </Link>
                  )}
                  {/* Make the Order link visible on all screen sizes */}
                  <Link
                    to={"/order"}
                    className="widespace-nowrap hover:bg-slate-100 p-3"
                  >
                    Order
                  </Link>
                </nav>
              </div>
            )}
          </div>

          <div>
            {user?._id ? (
              <button
                onClick={handlelogout}
                className="px-2 py-1 rounded-full bg-red-600 text-white hover:bg-red-800"
              >
                Logout
              </button>
            ) : (
              <Link to={"/signin"}>
                <button className="px-2 py-1 rounded-full bg-red-600 text-white hover:bg-red-800">
                  Login
                </button>
              </Link>
            )}
          </div>

          {user?._id && (
            <Link
              to={"/cart"}
              className="text-2xl relative flex items-center justify-center py-3 mx-4"
            >
              <span className="relative">
                <FiShoppingCart />
                <div className="bg-red-600 text-white w-5 h-5 flex items-center justify-center rounded-full absolute -top-2 -right-2">
                  <p className="text-sm">{context?.cartProductCount}</p>
                </div>
              </span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
