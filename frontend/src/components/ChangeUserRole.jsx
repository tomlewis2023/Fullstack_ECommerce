import React, { useState } from "react";
import Role from "../common/role";
import { IoClose } from "react-icons/io5";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangeUserRole = ({ fname, email, role, onClose,userId,callFunc }) => {
    //props received from parent Allusers
  const [userRole, setuserRole] = useState(role);

  const handleonchange = (e) => {
    setuserRole(e.target.value);
    
  };

  const updateUserRole = async () => {
    const fetchResponse = await fetch(SummaryApi.updateuser.url, {
      method: SummaryApi.updateuser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId :userId,
        role: userRole,
      }),
    });
    const responseData = await fetchResponse.json();
    toast.success(responseData.message)
    onClose()
    //from props
    callFunc()
    
    console.log("userrole", responseData);
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <div>
          <button className="block ml-auto" onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <h1 className="pb-4 text-lg font-medium">Change user Role</h1>
        <p>Name :{fname}</p>
        <p>Email: {email}</p>

        <div className="flex items-center justify-between my-4">
          <p>Role:</p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleonchange}
          >
            {Object.values(Role).map((e) => {
              return (
                <option value={e} key={e}>
                  {e}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
