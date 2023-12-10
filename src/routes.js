import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Search from "./Search";
import Login from "./Auth/login";
import Signup from "./Auth/signup";
import UserProfile from "./Profile/userProfile";
import Details from "./Search/Details";
import Company from "./Company";
import { useEffect, useState } from "react";
import * as client from "./client";
import Spinner from "./Components/Spinner";

export default function AllRoutes() {
    const {pathname} = useLocation();
    const [hasLoaded, setHasLoaded] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
    const [role, setRole] = useState("");
    const fetchAccount = async () => {
      const account = await client.account();
      if (account) {
        setIsUserLoggedIn(true);
        setRole(account.role);
      } else {
        setIsUserLoggedIn(false);
        setRole("")
      }
      setHasLoaded(true);
    }

    useEffect(() => {
        fetchAccount();
      }, [pathname])
  
    const makeProtectedRoute = (path, element, userRole) => {
      if (!hasLoaded) {
        return <Route path={path} element={<Spinner />} />;
      }
      if (!isUserLoggedIn) {
        return <Route path={path} element={<Navigate to="/login"/>} />;
      } else if (role && role !== userRole) {
        return <Route path={path} element={<Navigate to="/home" />} />;
      } else {
        return <Route path={path} element={element} />;
      }
    };

    return (
        <Routes>
          <Route path="/"             element={<Navigate to="/home"/>}/>
          <Route path="/home"         element={<Home />}/>
          <Route path="/search/:id?"  element={<Search />}/>
          <Route path="/details/:id"  element={<Details />}/>
          <Route path="/profile"      element={<Profile />}/>
          <Route path="/profile/:id"  element={<UserProfile />}/>
          <Route path="/login"        element={<Login />}/>
          <Route path="/register"     element={<Signup />}/>
          {makeProtectedRoute("/company", <Company />, "PUBLISHER")}
        </Routes>
    )
}