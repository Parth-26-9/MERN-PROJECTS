import React, { useEffect, useState } from "react";
import axios from "axios";

const fetchUserData = async (setUser) => {
  try {
    const response = await axios.get("http://localhost:4000/user/allUser");
    setUser(response);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const ProfilePage = () => {
  const [user, setUser] = React.useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.data.allUser[0].email);
    }
  });

  useEffect(() => {
    fetchUserData(setUser);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  let ans = "";

  for (let i = 0; i < email.length; i++) {
    if (email.charAt(i) === "@") {
      break;
    } else {
      ans = ans + email.charAt(i);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">{ans}</h2>
        <p className="text-xl font-medium text-gray-600">{email}</p>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => (window.location.href = "/home")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
