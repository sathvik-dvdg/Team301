import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('email-id').value;
    const password = document.getElementById('password').value;

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Find user with matching credentials
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // Store current user info
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/third');
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <>
      <div className="body">
        <div className="header">
          <p id="header">Login Page</p>
        </div>

        <div className="login">
          <div className="form">
            <form className="login_form" onSubmit={handleSubmit}>
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
