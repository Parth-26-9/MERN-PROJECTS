import { Provider } from "react-redux";

import ListOfProducts from "./Components/Product-Lists/ListOfProducts";
import Home from "./Components/Pages/Home";
import LoginPage from "./Components/Pages/LoginPage";
import SignupPage from "./Components/Pages/SignupPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./Components/Cart/Cart";
import Checkout from "./Components/Pages/Checkout";
import ProductDetails from "./Components/Product-Lists/ProductDetails";
import ProductDetailPage from "./Components/Pages/ProductDetailPage";
import ResetPasswordPage from "./Components/Pages/ResetPasswordPage";
import UploadProduct from "./Components/Pages/UploadProduct";
import ForgetPassword from "./Components/Auth/ForgetPassword";
import ProfilePage from "./Components/Pages/ProfilePage";
import {OfflinePayment} from "./Components/PaymentSection/OfflinePayment";
import SmartInput from "./Components/SmartInput/SmartInput";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <SignupPage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/product-details/:productId",
    element: <ProductDetailPage />,
  },
  {
    path: "/reset-password/:id/:token",
    element: <ResetPasswordPage />,
  },
  {
    path: "/forgetPassword",
    element: <ForgetPassword />,
  },
  {
    path: "/uploadProduct",
    element: <UploadProduct />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/cashPayment",
    element: <OfflinePayment />,
  },
  {
    path:"/smartInput",
    element:<SmartInput/>,
  },
  
]);

export default function App() {
  return (
    <RouterProvider router={router}>
      <LoginPage />
      <SignupPage />
    </RouterProvider>
  );
}
