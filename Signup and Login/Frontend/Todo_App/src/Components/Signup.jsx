// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");

  const handleSignUp = async () => {

    
    // eslint-disable-next-line no-unused-vars
    const data = {
      id,
      username,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/user/signup",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <div className="signupClass">
      <h1>SignUp Form</h1>
      <div className="signUpContainer">
        <h1>{id}</h1>
        <h1>Enter Email</h1>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          placeholder="email ..."
        />
        <h1>Enter Password</h1>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="password ..."
        />
        <button onClick={handleSignUp}>Sign up</button>
      </div>
    </div>
  );
}
