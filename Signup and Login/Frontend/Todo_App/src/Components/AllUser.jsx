// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import "./AllUser.css";
import axios from "axios";
// eslint-disable-next-line react/prop-types
export function AllUser({ user }) {
  // eslint-disable-next-line react/prop-types
  if (!Array.isArray(user) || user.length == 0) {
    return <div>No User Found</div>;
  }

  // eslint-disable-next-line react/prop-types, no-unused-vars
  return (
    <>
      <h1>Registered Users</h1>
      {user.map(function (e) {
        return (
          // eslint-disable-next-line react/jsx-key
          <div className="UserHandle" key={e.id}>
            <h1>{e.username}</h1>
            <h1>{e.password}</h1>
            <button
              onClick={async function () {
                // eslint-disable-next-line no-empty
                try {
                  // eslint-disable-next-line no-unused-vars

                  const response = await axios.delete(
                    `http://localhost:3000/user/deleteUser/${e._id}`,
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  alert(`${e.username} delete Successfully`);
                  window.location.reload()
                } catch (error) {
                  console.log(error);
                }
              }}

            >
              Delete user
            </button>
          </div>
        );
      })}
    </>
  );
}
