import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

export default function Login(){
  const navigate = useNavigate();

  const handleSubmit = (e) => {
      e.preventDefault();
      const email = document.getElementById('email-id').value;
      const password = document.getElementById('password').value;
  
      fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
      })
      .then(response => {
          if (response.ok) {
              localStorage.setItem('currentUser', JSON.stringify({username: username}));
              navigate('/third');
          } else {
              alert('Invalid credentials!');
          }
        
      })
      .catch(error => {
          console.error('Error:', error);
          alert('An error occurred during login.');
      });
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

              <label htmlFor="email-id">Username:</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
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
