import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/Thirdpage.css";

const ThirdPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            navigate('/login');
        }
    }, [navigate]);

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
                <form>
                    <input type="text" placeholder="Enter type of soil" />
                    <input type="text" placeholder="Enter Ph Level" />
                    <input type="text" placeholder="Enter Moisture (in %)" />
                    <input type="text" placeholder="Enter Nitrogen level (kg/ha)" />
                    <input type="text" placeholder="Enter Potassium (kg/ha)" />
                    <button onClick={() => navigate("/second")}>
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
                        <p>© 2024 All Rights Reserved. Designed by HTML & CSS</p>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default ThirdPage; 