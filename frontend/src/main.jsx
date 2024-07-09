import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { OrdersListPage } from "./pages/OrdersListPage";
import { OrderPage } from "./pages/OrderPage";
import { ProductsListPage } from "./pages/ProductsListPage";

const router = createBrowserRouter([
  {
    path: "/my-orders",
    element: <OrdersListPage />,
  },
  {
    path: "/add-order/:id",
    element: <OrderPage />,
  },
  {
    path: "/add-order",
    element: <OrderPage />,
  },
  {
    path: "/products",
    element: <ProductsListPage />,
  },
  {
    path: "/*",
    element: <Navigate to="/my-orders" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
