import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setStoreCartMessage } from "../../ReduxStore/centerSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState("");

  async function getData() {
    try {
      const response = await axios.get("http://localhost:4000/cart/cartItem");
      setProducts(response.data.cart);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  let myTotal = 0;

  const handleRemoveFromCart = async (deleteId) => {
    try {
      const response = await axios.delete(
        ` http://localhost:4000/cart/carts/products/${deleteId}`
      );
      toast.success("Product removed from cart");
      getData();
    } catch (error) {
      console.log(error);
      toast.error("Error removing product from cart");
    }
  };

  const handleCheckout = () => {
    toast.success("Checkout initiated");

    setTimeout(() => {
      navigate("/checkout");
    }, 2000);
  };

  return (
    <>
      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Cart
        </h1>
        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {products &&
                products.map(
                  (product) => (
                    console.log(product),
                    (
                      <li key={product._id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.img}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <p>{product.productName}</p>
                              </h3>
                              <p className="ml-4">
                                {Number(product.Price) * Number(product.qty)}
                              </p>
                            </div>
                            {
                              (myTotal +=
                                Number(product.Price) * Number(product.qty))
                            }
                            <p className="mt-1 text-sm text-gray-500">
                              {product.color}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-3 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty
                              </label>
                              <select>
                                <option value={product.qty}>
                                  {product.qty}
                                </option>
                              </select>
                            </div>

                            <div className="flex">
                              <button
                                type="submit"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={() =>
                                  handleRemoveFromCart(product.productId)
                                }
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  )
                )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>{myTotal}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <button
              type="submit"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => setOpen(false)}
              >
                <Link to="/home">Continue Shopping</Link>
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
