import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import Home from "./Home";
import Profile from "./Profile";
import Search from "./Search";
import Login from "./Auth/login";
import Signup from "./Auth/signup";
function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/"           element={<Navigate to="/home"/>}/>
          <Route path="/home"       element={<Home />}/>
          <Route path="/search"     element={<Search />}/>
          <Route path="/profile"    element={<Profile />}/>
          <Route path="/login"      element={<Login />}/>
          <Route path="/register"   element={<Signup />}/>
          <Route path="*"           element={<Navigate to="/home"/>}/>
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;
