import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  return (
    <>
      <div className="body">
        <div className="header">
          <p id="header">Login Page</p>
        </div>

        <div className="login">
          <div className="form">
            <form className="login_form">
              <h3>Login</h3>

              <label htmlFor="email-id">Email:</label>
              <input
                type="text"
                id="email-id"
                placeholder="Enter your email"
                required
              />

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                required
              />

              <button type="button" onClick={() => navigate("/signup")}>
                Don't have an account? Sign Up
              </button>

              <div className="submit">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button type="button" className="btn btn-secondary">
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
