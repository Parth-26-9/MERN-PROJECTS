import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SmartInput() {
  const [inputValue, setInputValue] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);

    const response = await axios.post("http://localhost:4000/magic/input", {
      inputValue,
      number,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className=" m-5">Workable Prompts: Enter Mobile Number on 3 & 4</h1>
      <h2 className=" m-5">1) remove 1 product from cart </h2>
      <h2 className=" m-5">2) add iphone 14 Pro Max product </h2>
      <h2 className=" m-5">3)  send me current cart information </h2>
      <h2 className=" m-5">4) send about me </h2>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md"
        placeholder=" Write something "
      />
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md"
        placeholder="Enter Your Number"
      />
      <button
        onClick={handleClick}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
      >
        Submit
      </button>
      <button
        onClick={() => navigate("/home")}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
      >
        Back
      </button>

      {showSuccess && (
        <div className="mt-4 text-green-500 animate-bounce text-center">
          आपका काम हो जाएगा
        </div>
      )}
    </div>
  );
}

export default SmartInput;
