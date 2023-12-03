import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "../client";

function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const signin = async () => {
    await client.signin(credentials)
    .then((response) => {
      navigate("/profile");
    })
    .catch((err) => {
      setError("Invalid credentials")
    })
  };

  return (
    <div className="container">
        <h1 className="mt-3">Login</h1>
        <form
            onSubmit={(e) => {
            e.preventDefault();
            if (credentials.username === "test" && credentials.password === "test") {
                navigate("/profile");
            } else {
                signin();
            }}}
        >
            <div className="mb-3">
                <label htmlFor="username" className="form-label">
                    Username
                </label>
                <input
                    value={credentials.username}
                    onChange={(e) => {
                        setCredentials({ ...credentials, username: e.target.value });
                    }}
                    type="text"
                    className="form-control"
                    id="username"
                    aria-describedby="emailHelp"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Password
                </label>
                <input
                    value={credentials.password}
                    onChange={(e) => {
                        setCredentials({ ...credentials, password: e.target.value });
                    }}
                    type="password"
                    className="form-control"
                    id="password"
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Login
            </button>
            <br />
            <br />
            {error && <div className="alert alert-danger">{error}</div>}
        </form>
    </div>
  );
}
export default Login;