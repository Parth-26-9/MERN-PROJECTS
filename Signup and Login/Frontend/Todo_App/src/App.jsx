import { useEffect, useState } from "react";
import "./App.css";
import { Signup } from "./Components/Signup.jsx";
import { Login } from "./Components/Login.jsx";
import { AllUser } from "./Components/AllUser.jsx";
import axios from "axios";

function App() {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState("");
  const [isTrue, setIsTrue] = useState(false);

  useEffect(() => {
    // Move the setToken call inside useEffect
    setToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJfaWQiOiI2NTk3Yzc5NmU5OWM2MDUyOWY5OTJkNWYiLCJ1c2VybmFtZSI6InBhcnRoMkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzEyMzEyMzEyMyIsIl9fdiI6MH0seyJfaWQiOiI2NTk3Yzc5Y2U5OWM2MDUyOWY5OTJkNjIiLCJ1c2VybmFtZSI6InBhcnRoM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzEyMzEyMzEyMyIsIl9fdiI6MH1dLCJpYXQiOjE3MDQ1Mzc2MjB9.WtDp5E0t1OZqOwaTgkhtZ3y1wa7tcexato5KAib6nm8"
    );

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/allUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.allUser); // Assuming the response.data contains the user data
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, [token]); // Add token as a dependency to useEffect

  function handleUsers() {
    setIsTrue((x) => !x);
  }
  function dummyData() {
    return <div></div>;
  }

  return (
    <div className="container">
      <Signup />
      <Login />
      <button onClick={handleUsers}>{isTrue ? "Hide Data":"See Data"}</button>
      <AllUser user={isTrue ? user : <dummyData />} />
    </div>
  );
}

export default App;
