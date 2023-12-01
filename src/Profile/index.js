import React, { useState, useEffect } from "react";
import * as client from "../client";

export default function Profile() {
    const [user, setUser] = useState();
    const fetchAccount = async () => {
      const account = await client.account();
      console.log(account)
      setUser(account);
    };

    useEffect(() => {
      fetchAccount();
    }, []);

    const capitalize = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return (
      <div className="container">
        {user && (
          <div>
            <h1 className="mt-3">{capitalize(user.first_name)}'s Profile</h1>
            <div className="card mb-2">
              <div className="card-body">
                <h5 className="card-title">Username: {user.username}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Email: {user.email}</h6>
                <h6 className="card-subtitle text-muted">Role: {capitalize(user.role.toLowerCase())}</h6>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{capitalize(user.first_name)}'s Favorite Books</h5>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}