import {HashRouter} from "react-router-dom";
import Nav from "./Navigation";
import AllRoutes from "./routes";

function App() {  
  return (
    <HashRouter>
      <div className="container">
        <Nav />
        <AllRoutes />
      </div>
    </HashRouter>
  );
}
export default App;
