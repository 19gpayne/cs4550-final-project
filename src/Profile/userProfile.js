import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as client from "../client";
import { capitalize } from "../utils";

export default function UserProfile() {
    const [user, setUser] = useState();
    const {id} = useParams();

    const fetchAccount = async () => {
        const account = await client.findUserById(id);
        setUser(account);
    }

    useEffect(() => {
        fetchAccount();
    }, []);

    return (
      <div className="container">
        {user && (
          <div>
            <h1 className="mt-3">{capitalize(user.first_name)}'s Profile</h1>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{capitalize(user.first_name)}'s Books</h5>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}