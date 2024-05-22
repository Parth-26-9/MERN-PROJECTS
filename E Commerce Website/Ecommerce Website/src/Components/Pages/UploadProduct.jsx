import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductForm = () => {
  const { register, handleSubmit } = useForm();
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files).map((file) => file);
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("productId", data.productId);
    formData.append("title", data.title);
    formData.append("desc", data.desc);
    images.forEach((image) => {
      formData.append("img", image);
    });
    formData.append("color", data.color);
    formData.append("price", data.price);
    formData.append("qty",data.qty)

    try {
      const response = await axios.post(
        "http://localhost:4000/product/createProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success('Product Added Successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="w-full max-w-md p-6 bg-white rounded shadow-md"
        >
          <div className="flex flex-col space-y-4">
            <input
              type="number"
              {...register("productId")}
              placeholder="Product ID"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              {...register("title")}
              placeholder="Title"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              {...register("desc")}
              placeholder="Description"
              className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <input
              accept="image/*"
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              {...register("color")}
              placeholder="Color"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              {...register("price")}
              placeholder="Price"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              {...register("qty")}
              placeholder="Qty"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-between">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
              <button
                onClick={() => (window.location.href = "/home")}
                className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Back
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductForm;