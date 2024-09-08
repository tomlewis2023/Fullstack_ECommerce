import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const Admin = () => {
  //import initial state redux
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="min-h-[calc(100vh-150px)] md:flex hidden ">
      {/* aside side menu */}
      <aside className="bg-white min-h-full w-full max-w-60 customShadow">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-4xl cursor-pointer ">
            {user?.profilepic ? (
              <img
                src={user?.profilepic}
                className="w-20 h-20 rounded-full"
                alt={user?.fname}
              />
            ) : (
              <FaRegUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.fname}</p>
          <p className="text-sm">{user?.role}</p>
        </div>
        {/* navigation */}
        <div>
          <nav className="grid p-4">
            <Link to={"allusers"} className="px-2 py-1 hover:bg-slate-100">
              All Users
            </Link>
            <Link to={"allproducts"} className="px-2 py-1 hover:bg-slate-100">
              All Product
            </Link>
            <Link to={"all-orders"} className="px-2 py-1 hover:bg-slate-100">
              All Orders
            </Link>
          </nav>
        </div>
      </aside>

      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
