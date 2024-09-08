import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Forgotpassword from "../pages/Forgotpassword";
import Signup from "../pages/Signup";
import Admin from "../pages/Admin";
import AllUsers from "../pages/AllUsers";
import Products from "../pages/Products";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import OrderPage from "../pages/OrderPage";
import AllOrder from "../pages/AllOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signin",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <Forgotpassword />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "product-category",
        element: <CategoryProduct />,
      },
      {
        path: "product/:id",
        element:<ProductDetails/>,
      },
      {
        path: "cart",
        element:<Cart/>,

      },
      {
        path: "success",
        element:<Success/>,

      },
      {
        path:"cancel",
        element : <Cancel/>
      },
      {
        path : "search",
        element : <SearchProduct/>

      },
      {
        path : "order",
        element : <OrderPage/>
      },

      {
        path: "admin-panel",
        element: <Admin />,
        children: [
          {
            path: "allusers",
            element: <AllUsers />,
          },
          {
            path: "allproducts",
            element: <Products />,
          },
          {
            path : "all-orders",
            element: <AllOrder/>,
          }
        ],
      },
    ],
  },
]);

export default router;
