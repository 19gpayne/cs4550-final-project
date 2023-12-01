import React, { useState, useEffect } from "react";
import * as client from "../client";
import { capitalize } from "../utils";

export default function Profile() {
    const [user, setUser] = useState();
    const [username, setUsername] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const fetchAccount = async () => {
      const account = await client.account();
      setUser(account);
      setUsername(account.username);
      setFirstName(account.first_name);
      setLastName(account.last_name);
      setEmail(account.email);
      setPassword(account.password);
    };

    useEffect(() => {
      fetchAccount();
    }, []);

    const resetUser = () => {
      setUsername(user.username);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
      setPassword(user.password);
    }
    
    const saveChanges = () => {
      const updatedUser = {
        _id: user._id,
        username: username,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password
      }
      client.updateUser(updatedUser);
    }
    return (
      <div className="container">
        {user && (
          <div>
            <h1 className="mt-3">{capitalize(user.first_name)}'s Profile</h1>
            <div className="card mb-2">
              <div className="card-body">
                <h6 className="d-flex align-items-center card-subtitle mb-3 text-muted">Username: <input className="form-control w-25 ms-3" type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></h6>
                <h6 className="d-flex align-items-center card-subtitle mb-3 text-muted">First Name: <input className="form-control w-25 ms-3" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></h6>
                <h6 className="d-flex align-items-center card-subtitle mb-3 text-muted">Last Name: <input className="form-control w-25 ms-3" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} /></h6>
                <h6 className="d-flex align-items-center card-subtitle mb-3 text-muted">Email: <input className="form-control w-25 ms-3" type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></h6>
                <h6 className="d-flex align-items-center card-subtitle mb-3 text-muted">Password: <input className="form-control w-25 ms-3" type="text" value={password} onChange={(e) => setPassword(e.target.value)} /></h6>
                <div className="mt-3 float-end">
                  <button className="btn btn-light border me-2" onClick={resetUser}>Discard Changes</button>
                  <button className="btn btn-primary" onClick={saveChanges}>Save</button>
                </div>
                
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Your Books</h5>
              </div>
            </div>
          </div>
        )}

      </div>
    );
}