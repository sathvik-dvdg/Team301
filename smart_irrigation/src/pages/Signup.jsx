import { useNavigate } from "react-router-dom";
import "../Styles/Signup.css";
import { useState } from "react";
export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const username = `${firstName} ${lastName}`
    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password })
    })
    .then(response => {
        if (response.ok) {
            alert('Signup successful!');
            navigate('/login');
        } else {
            response.text().then(text => {
                alert(text);
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during signup.');
    });
    
  };

  return (
    <div className="signup-page">
      <div className="form">
        <form className="signup_form" onSubmit={handleSubmit}>
          <h3>Sign Up</h3>

          <label htmlFor="first-name">First Name:</label>
          <input
            type="text"
            id="first-name"
            placeholder="Enter your first name"
            required
          />

          <label htmlFor="last-name">Last Name:</label>
          <input
            type="text"
            id="last-name"
            placeholder="Enter your last name"
            required
          />

          <label htmlFor="signup-email">Email:</label>
          <input
            type="email"
            id="signup-email"
            placeholder="Enter your email"
            required
          />

          <label htmlFor="signup-password">Password:</label>
          <input
            type="password"
            id="signup-password"
            placeholder="Create a password"
            required
          />

          {/* Navigation button to Login */}
            <button type="button"  onClick={() => navigate("/login")}>
            Already have an account? Login
            </button> 

          <div className="submit">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
            <button type="button" className="btn btn-secondary">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
