import { Link, useLocation } from "react-router-dom";
function Nav() {
  const { pathname } = useLocation();
  const isUserLoggedIn = false;
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
        {!isUserLoggedIn && (
            <>
                <Link to="/login"
                    className={`nav-link float-end ${pathname.includes("login") ? "active" : ""}`}>Login</Link>
                <Link to="/register"
                    className={`nav-link float-end ${pathname.includes("register") ? "active" : ""}`}>Register</Link>
            </>
        )}
        </div>

    </nav>
  );
}
export default Nav;