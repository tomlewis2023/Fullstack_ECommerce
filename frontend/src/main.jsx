import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.jsx";
import { Provider } from "react-redux";

import { store } from "./store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  //react router and redux 
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
