import React, { useState, useEffect } from "react";
import * as client from "../client";
import { capitalize } from "../utils";
import { Link } from "react-router-dom";
import Favorites from "./favorites";
import Toast from "../Components/Toast";
import  { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [username, setUsername] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [role, setRole] = useState();
    const [showToast, setShowToast] = useState(false);
    const fetchAccount = async () => {
      const account = await client.account();
      setUser(account);
      setUsername(account.username);
      setFirstName(account.first_name);
      setLastName(account.last_name);
      setEmail(account.email);
      setPassword(account.password);
      setRole(account.role);
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
      setRole(user.role);
    }
    
    const saveChanges = async () => {
      const updatedUser = {
        _id: user._id,
        username: username,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        role: role,
      }
      await client.updateUser(updatedUser);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }

    const deleteAccount = async () => {
      await client.deleteUser(user);
      navigate("/login")
    }

    const unfavorite = async (id) => {
      const updatedUser = {
          ...user,
          favorites: user.favorites.filter((favorite) => favorite.book_key !== id)
      }
      await client.updateUser(updatedUser);
      await fetchAccount()
    }

    return (
      <div>
        {user && (
          <div>
            <h1 className="mt-3">{capitalize(user.first_name)}'s Profile</h1>
            <div className="card mb-2">
              <div className="card-body">
                <h6 className="card-subtitle mb-3 text-muted row"><div className="col-lg-7 col-md-8 col-12 d-flex align-items-center"><p className="text-nowrap mb-0">Username:</p> <input className="form-control ms-3" type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></div></h6>
                <h6 className="card-subtitle mb-3 text-muted row"><div className="col-lg-7 col-md-8 col-12 d-flex align-items-center"><p className="text-nowrap mb-0">First Name:</p> <input className="form-control ms-3" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></div></h6>
                <h6 className="card-subtitle mb-3 text-muted row"><div className="col-lg-7 col-md-8 col-12 d-flex align-items-center"><p className="text-nowrap mb-0">Last Name:</p> <input className="form-control ms-3" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} /></div></h6>
                <h6 className="card-subtitle mb-3 text-muted row"><div className="col-lg-7 col-md-8 col-12 d-flex align-items-center"><p className="text-nowrap mb-0">Email:</p> <input className="form-control ms-3" type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></div></h6>
                <h6 className="card-subtitle mb-3 text-muted row"><div className="col-lg-7 col-md-8 col-12 d-flex align-items-center"><p className="text-nowrap mb-0">Password:</p> <input className="form-control ms-3" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div></h6>
                <div className="mt-3 float-end">
                  <button className="btn btn-light border me-2" onClick={resetUser}>Discard Changes</button>
                  <button className="btn btn-primary" onClick={saveChanges}>Save</button>
                  <Toast setShowToast={setShowToast} showToast={showToast} message={"Changes saved!"} />
                </div>
              </div>
            </div>
            <div className="card mb-2">
              <div className="card-body">
                <h5 className="card-title">Admin Permissions</h5>
                <button className="btn btn-danger" onClick={deleteAccount}>Delete Account</button>
                {role === "PUBLISHER" && (
                  <button className="ms-3 btn btn-primary" onClick={() => navigate("/company")}>My Company</button>
                )}
              </div>
            </div>
            <Favorites user={user} isUser={true} unfavorite={unfavorite} />
          </div>
        )}
        {!user && (
          <Spinner />
        )}
      </div>
    );
}