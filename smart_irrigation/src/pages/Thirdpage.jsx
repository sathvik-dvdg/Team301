import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Thirdpage.css";

const ThirdPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        location: "",
        moisture: "",
        ph: "",
        nitrogen: "",
        phosphorous: "",
        potassium: ""
    });

    // Add authentication check
    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            navigate('/login');
        }
    }, [navigate]);

    // Prevent back navigation
    useEffect(() => {
        window.history.pushState(null, null, window.location.pathname);
        const handlePopState = (e) => {
            e.preventDefault();
            window.history.pushState(null, null, window.location.pathname);
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/second", { state: formData });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const scrollToContact = () => {
        document.querySelector('.footer-section.contact').scrollIntoView({
            behavior: 'smooth'
        });
    };

    return (
        <div>
            <header className="topbar">
                <div className="leftbox" onClick={scrollToContact}>Contact</div>
                <button className="rightbox" onClick={() => navigate("/dashboard")}>
                    Dashboard
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
                    <div className="soil-inputs">
                        <div className="input-group">
                            <label>Location</label>
                            <input
                                type="text"
                                name="location"
                                placeholder="Enter your location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                        </div>
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
                        </div>
                    </div>
                    <button type="submit">
                        View Report
                    </button>
                </form>

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

export default ThirdPage;