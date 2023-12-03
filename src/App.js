import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import Home from "./Home";
import Profile from "./Profile";
import Search from "./Search";
import Login from "./Auth/login";
import Signup from "./Auth/signup";
import Nav from "./Navigation";
import UserProfile from "./Profile/userProfile";
import Details from "./Search/Details";
function App() {
  return (
    <HashRouter>
      <div className="container">
        <Nav />
        <Routes>
          <Route path="/"             element={<Navigate to="/home"/>}/>
          <Route path="/home"         element={<Home />}/>
          <Route path="/search/:id?"  element={<Search />}/>
          <Route path="/details/:id"  element={<Details />}/>
          <Route path="/profile"      element={<Profile />}/>
          <Route path="/profile/:id"  element={<UserProfile />}/>
          <Route path="/login"        element={<Login />}/>
          <Route path="/register"     element={<Signup />}/>
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;
