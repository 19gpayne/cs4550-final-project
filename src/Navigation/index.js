import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Nav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  const logout = () => {
    setIsUserLoggedIn(false);
    navigate("/login");
  }
  return (
    <nav className="mt-2 d-flex">
        <div className="nav nav-tabs">
        <Link to="/home"
            className={`nav-link ${pathname.includes("home") ? "active" : ""}`}>Home</Link>
        <Link to="/search"
            className={`nav-link ${pathname.includes("search") ? "active" : ""}`}>Search</Link>
        <Link to="/profile"
            className={`nav-link ${pathname.includes("profile") ? "active" : ""}`}>Profile</Link>
        </div>
        <div className="nav nav-tabs ms-auto">
            {(!isUserLoggedIn || pathname.includes("login") || pathname.includes("register")) && (
                <>
                    <Link to="/login"
                        className={`nav-link float-end ${pathname.includes("login") ? "active" : ""}`}>Login</Link>
                    <Link to="/register"
                        className={`nav-link float-end ${pathname.includes("register") ? "active" : ""}`}>Register</Link>
                </>
            )}
            {isUserLoggedIn && !pathname.includes("login") && !pathname.includes("register") && (
                <>
                    <div
                        role="button"
                        onClick={logout}
                        className={`nav-link float-end ${pathname.includes("logout") ? "active" : ""}`}>Logout</div>
                </>
            )}
        </div>

    </nav>
  );
}
export default Nav;