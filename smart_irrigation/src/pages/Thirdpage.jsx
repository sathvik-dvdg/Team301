import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Styles/Thirdpage.css";
import { getThirdPageData } from "../api/api";
import { getThirdPageHistory } from "../api/api";

const ThirdPage = () => {
    const navigate = useNavigate();
    
    const [sensorData, setSensorData] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (showHistory) {
                try {
                    const data = await getThirdPageHistory();
                    // Process history data
                    const formattedHistory = data.flatMap(entry =>
                      entry.data.map(item => ({
                        name: item.name,
                        value: item.value
                      }))
                    );
                    setSensorData(formattedHistory);

                } catch (error) {
                    console.error("Error fetching sensor data:", error);
                }
            } else {
                try {
                    const data = await getThirdPageData();
                    setSensorData(data);
                } catch (error) {
                    console.error("Error fetching sensor data:", error);
                }

            }
        }; fetchData();
    }, [showHistory]);

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

    const toggleView = () => {
        setShowHistory(!showHistory);
    };


    const scrollToContact = () => {
        document.querySelector('.footer-section.contact').scrollIntoView({
            behavior: 'smooth'
        });
    };

    return (
        <div >
            <div>
                <header className="topbar">
                    <div className="leftbox" onClick={scrollToContact}>Contact</div>
                    <button className="rightbox" onClick={() => navigate("/dashboard")}>
                        Dashboard
                    </button>
                    <h1>Smart Irrigation System</h1>
                </header>
                <button onClick={toggleView}>
                    {showHistory ? "Show Current Data" : "Show History"}
                </button>

                {showHistory ? (
                  <div className="sensor-data-container">
                  <ul>
                    {sensorData.map((item, index) => (
                      <li key={index}>
                        <div className="sensor-card">
                          <h3>{item.name}</h3>
                          <p>Value: {item.value}%</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                ) : (
                    <div className="sensor-data-container">
                        {sensorData.map((sensor, index) => (
                            <div key={index} className="sensor-card">
                                <h3>{sensor.name}</h3>
                                <p>Value: {sensor.value}%</p>
                            </div>
                        ))}
                    </div>
                )}
                <main>
                    <div className="hero">
                        <h2>
                            Get Complete Agricultural Report – Fertility, Rainfall, <br />
                            Drought Risk & More! 🌾 in
                        </h2>
                        <span className="highlight">YOUR CITY</span>
                    </div>

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
        </div>
    );
};

export default ThirdPage;