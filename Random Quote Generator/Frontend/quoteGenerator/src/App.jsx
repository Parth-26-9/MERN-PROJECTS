import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [randomQuoteState, setRandomQuote] = useState("");
  const [inputData, setInputData] = useState("");
  async function addQuote() {
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        "http://localhost:3000/quote/allData",
        {
          dataId: 1,
          quote: inputData,
        },
        { headers }
      );

      // Handle the response if needed
      alert(response.data.msg); // You can log the response or handle it as per your requirements
    } catch (error) {
      // Handle errors if the POST request fails
      console.error("Error adding quote:", error);
    }
  }

  async function randomQuote() {
    const allQuoteList = await axios.get("http://localhost:3000/quote/allData");
    const quoteListLength = allQuoteList.data.allData.length;
    const randomNumber = Math.floor(Math.random() * quoteListLength)+1;

    const findQuoteById = await axios.get(
      `http://localhost:3000/quote/allData/${randomNumber}`
    );

    setRandomQuote(findQuoteById.data.myQuote.quote);

    // const randomQuote = findQuoteById.data.
  }
  return (
    <div className="container">
      <div className="addQuote">
        <input
          type="text"
          onChange={function (e) {
            setInputData(e.target.value);
          }}
          placeholder="add your quote"
        />
        <button onClick={addQuote}>Add Quote</button>
      </div>
      <div className="randomQuote">
        <h1>{randomQuoteState}</h1>
      </div>
        <button onClick={randomQuote}>Generate</button>
    </div>
  );
}

export default App;
