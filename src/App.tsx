import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admindashboard from "./admin/Pages/Admindashboard/Admindashboard";

import { Provider } from "react-redux";
import store from "./admin/Store/store";
import Login from "./admin/Pages/Login";
import SingleOrder from "./admin/Pages/SingleOrder";
import { io } from "socket.io-client";
import ProductDetails from "./admin/Pages/ProductDetails/ProductDetails";
import CategoryDetails from "./admin/Pages/CategoryDetails/CategoryDetails";
import UserDetails from "./admin/Pages/UserDetails/UserDetails";
import OrderDetails from "./admin/Pages/OrderDetails/OrderDetails";
import { Toaster } from "react-hot-toast";
import NotFound from "./admin/Pages/NotFound";
import Protected from "./protected/Protected";
export const socket = io("http://localhost:3000", {
  auth: {
    token: localStorage.getItem("token"),
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Admindashboard />
              </Protected>
            }
          ></Route>
          <Route
            path="/user-details"
            element={
              <Protected>
                <UserDetails />
              </Protected>
            }
          ></Route>
          <Route
            path="/product-details"
            element={
              <Protected>
                <ProductDetails />
              </Protected>
            }
          ></Route>
          <Route
            path="/category-details"
            element={
              <Protected>
                <CategoryDetails />
              </Protected>
            }
          ></Route>
          <Route
            path="/order-details"
            element={
              <Protected>
                <OrderDetails />
              </Protected>
            }
          ></Route>
          <Route
            path="/order/:id"
            element={
              <Protected>
                <SingleOrder />
              </Protected>
            }
          ></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </Provider>
  );
};

export default App;
