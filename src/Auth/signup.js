import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Navigation";

function Signup() {
  const [credentials, setCredentials] = useState({ username: "", email: "", first: "", last: "", password: "", confirm: "", role: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  return (
    <div className="container">
        <Nav />
        <h1 className="mt-3">Register</h1>
        <form
            onSubmit={(e) => {
                console.log(credentials)
            e.preventDefault();
            if (credentials.username === "" || credentials.email === "" || credentials.first === "" || credentials.last === "" || credentials.password === "" || credentials.confirm === "" || credentials.role === "") {
                setError("Please fill out all fields");
            } else if (credentials.password !== credentials.confirm) {
                setError("Passwords do not match");
            } else if (credentials.username === "test" && credentials.password === "test") {
                navigate("/home");
            } else {
                setError("Invalid Credentials");
            }
            }}
        >
            <div className="mb-3">
                <label htmlFor="username" className="form-label">
                    Username *
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
            <div className="d-flex">
                <div className="mb-3 w-50 me-4">
                    <label htmlFor="first" className="form-label">
                        First Name *
                    </label>
                    <input
                        value={credentials.first}
                        onChange={(e) => {
                            setCredentials({ ...credentials, first: e.target.value });
                        }}
                        type="text"
                        className="form-control"
                        id="first"
                    />
                </div>
                <div className="mb-3 w-50">
                    <label htmlFor="last" className="form-label">
                        Last Name *
                    </label>
                    <input
                        value={credentials.last}
                        onChange={(e) => {
                            setCredentials({ ...credentials, last: e.target.value });
                        }}
                        type="text"
                        className="form-control"
                        id="last"
                    />
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Email *
                </label>
                <input
                    value={credentials.email}
                    onChange={(e) => {
                        setCredentials({ ...credentials, email: e.target.value });
                    }}
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                />
            </div>
            <div className="d-flex">
                <div className="mb-3 w-50 me-4">
                    <label htmlFor="first" className="form-label">
                        Password *
                    </label>
                    <input
                        value={credentials.password}
                        onChange={(e) => {
                            setCredentials({ ...credentials, password: e.target.value });
                        }}
                        type="password"
                        className="form-control"
                        id="first"
                    />
                </div>
                <div className="mb-3 w-50">
                    <label htmlFor="last" className="form-label">
                        Confirm Password *
                    </label>
                    <input
                        value={credentials.confirm}
                        onChange={(e) => {
                            setCredentials({ ...credentials, confirm: e.target.value });
                        }}
                        type="password"
                        className="form-control"
                        id="last"
                    />
                </div>
            </div>
            <div className="mb-3">
                <div className="form-label">
                    Role *
                </div>
                <div className="d-flex align-items-center">
                    <input 
                        type="radio" 
                        id="reader" 
                        name="type" 
                        value="reader" 
                        onChange={(e) => {
                            setCredentials({ ...credentials, role: e.target.value });
                        }} 
                    />
                    <label htmlFor="reader" className="form-label ms-2 mb-0">
                        Reader
                    </label>
                    <input 
                        type="radio" 
                        id="professional" 
                        name="type" 
                        value="professional" 
                        className="ms-4" 
                        onChange={(e) => {
                            setCredentials({ ...credentials, role: e.target.value });
                        }}  
                    />
                    <label htmlFor="professional" className="form-label ms-2 mb-0">
                        Professional Reviewer
                    </label>

                    <input 
                        type="radio" 
                        id="publisher" 
                        name="type" 
                        value="publisher" 
                        className="ms-4" 
                        onChange={(e) => {
                            setCredentials({ ...credentials, role: e.target.value });
                        }}  
                    />
                    <label htmlFor="publisher" className="form-label ms-2 mb-0">
                        Publisher
                    </label>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">
                Signup
            </button>
            <br />
            <br />
            {error && <div className="alert alert-danger">{error}</div>}
        </form>
    </div>
  );
}
export default Signup;