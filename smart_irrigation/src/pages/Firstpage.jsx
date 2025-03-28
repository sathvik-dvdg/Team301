import { useNavigate } from "react-router-dom";
import "../styles/Firstpage.css";
import { useState } from "react";

const FirstPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: "",
    moisture: "",
    ph: "",
    nitrogen: "",
    phosphorous: "",
    potassium: ""
  });
  const [errors, setErrors] = useState({});

  const scrollToContact = () => {
    document.querySelector('.footer-section.contact').scrollIntoView({
      behavior: 'smooth'
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.moisture) {
      newErrors.moisture = "Moisture level is required";
    } else if (formData.moisture < 0 || formData.moisture > 100) {
      newErrors.moisture = "Moisture must be between 0 and 100";
    }

    if (!formData.ph) {
      newErrors.ph = "pH level is required";
    } else if (formData.ph < 0 || formData.ph > 14) {
      newErrors.ph = "pH must be between 0 and 14";
    }

    if (!formData.nitrogen) {
      newErrors.nitrogen = "Nitrogen level is required";
    } else if (formData.nitrogen < 0) {
      newErrors.nitrogen = "Nitrogen cannot be negative";
    }

    if (!formData.phosphorous) {
      newErrors.phosphorous = "Phosphorous level is required";
    } else if (formData.phosphorous < 0) {
      newErrors.phosphorous = "Phosphorous cannot be negative";
    }

    if (!formData.potassium) {
      newErrors.potassium = "Potassium level is required";
    } else if (formData.potassium < 0) {
      newErrors.potassium = "Potassium cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/second", { state: formData });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  return (
    <div>
      <header className="topbar">
        <div className="leftbox" onClick={scrollToContact}>Contact</div>
        <button className="rightbox" onClick={() => navigate("/login")}>
          Login
        </button>
        <h1>Smart Irrigation System</h1>
      </header>
      <main>
        <div className="hero">
          <h2>
            Get Complete Agricultural Report – Fertility, Rainfall, <br />
            Drought Risk & More! 🌾 in
          </h2>
          <span className="highlight">YOUR CITY</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="location"
              placeholder="Enter your location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            {errors.location && <span className="error">{errors.location}</span>}
          </div>
          <div className="soil-inputs">
            <div className="input-group">
              <label>Moisture Level (%)</label>
              <input
                type="number"
                name="moisture"
                min="0"
                max="100"
                step="0.1"
                placeholder="Enter moisture level"
                value={formData.moisture}
                onChange={handleChange}
                required
              />
              {errors.moisture && <span className="error">{errors.moisture}</span>}
            </div>
            <div className="input-group">
              <label>pH Level (0-14)</label>
              <input
                type="number"
                name="ph"
                min="0"
                max="14"
                step="0.1"
                placeholder="Enter pH level"
                value={formData.ph}
                onChange={handleChange}
                required
              />
              {errors.ph && <span className="error">{errors.ph}</span>}
            </div>
            <div className="input-group">
              <label>Potassium (kg/ha)</label>
              <input
                type="number"
                name="potassium"
                min="0"
                step="0.1"
                placeholder="Enter potassium level"
                value={formData.potassium}
                onChange={handleChange}
                required
              />
              {errors.potassium && <span className="error">{errors.potassium}</span>}
            </div>
            <div className="input-group">
              <label>Nitrogen (kg/ha)</label>
              <input
                type="number"
                name="nitrogen"
                min="0"
                step="0.1"
                placeholder="Enter nitrogen level"
                value={formData.nitrogen}
                onChange={handleChange}
                required
              />
              {errors.nitrogen && <span className="error">{errors.nitrogen}</span>}
            </div>
            <div className="input-group">
              <label>Phosphorous (kg/ha)</label>
              <input
                type="number"
                name="phosphorous"
                min="0"
                step="0.1"
                placeholder="Enter phosphorous level"
                value={formData.phosphorous}
                onChange={handleChange}
                required
              />
              {errors.phosphorous && <span className="error">{errors.phosphorous}</span>}
            </div>
          </div>
          <button type="submit">
            View Report
          </button>
        </form>

        {/* New Report Button */}

        <footer>
          <div className="footer-container">
            <div className="footer-section brand">
              <h2>SmartIrrigate</h2>
              <p>
                SmartIrrigate is an advanced agricultural insights platform that
                provides real-time data on soil fertility, temperature, rainfall
                probability, and drought risk. By leveraging AI-driven
                analytics, it helps farmers and agricultural professionals make
                informed irrigation and crop management decisions.
              </p>
            </div>
            <div className="footer-section contact">
              <h3>Contact Info</h3>
              <p>
                <strong>Office Address:</strong>
              </p>
              <p>
                CANARA ENGINEERING COLLEGE
                <br /> Sudheendra Nagar,
                <br /> Benjanapadavu, Bantwal Taluk,
                <br /> Mangalore, D.K. District,
                <br /> Karnataka, India - 574219
              </p>
              <p>
                <strong>Customer Service:</strong> +01 1234567890
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:contact@smartirrigate.com">
                  contact@smartirrigate.com
                </a>
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 All Rights Reserved. Designed by Team 301</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default FirstPage;