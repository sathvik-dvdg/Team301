import { useNavigate } from "react-router-dom";
import "../Styles/Firstpage.css";
import { useState, useEffect } from "react";

import { getFirstPageData, getDashboardHistory, getFirstPageHistory } from "../api/api";
const FirstPage = () => {
  const navigate = useNavigate();
  const [showHistory, setShowHistory] = useState(false);

  const [errors, setErrors] = useState({});
  const [pageData, setPageData] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [firstpageHistory, setFirstpageHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFirstPageData();
      setPageData(data);
    };
    const fetchHistory = async () => {
        const data = await getDashboardHistory();
        setHistoryData(data);
      };
      const fetchFirstPageHistory = async () => {
        const data = await getFirstPageHistory();
        setFirstpageHistory(data);
      }

    fetchData();
    fetchHistory();
    fetchFirstPageHistory();
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
        <button className="rightbox" onClick={() => navigate("/login")}>
          Login
        </button>
        <h1>Smart Irrigation System</h1>
      </header>
      <main>
        {pageData && (
          <div className="hero-info">
            <h2>{pageData.message}</h2>
            <img src={pageData.img} alt="Page" />
            <p>
              {pageData.description}
            </p>
          </div>
        )}
        <button onClick={() => setShowHistory(!showHistory)}>
            {showHistory ? 'Show Data' : 'Show History'}
          </button>
        {showHistory ? (
            <div className="history-section">
            <h2>First Page History</h2>
            <ul>
              {firstpageHistory.map((item, index) => (
                <li key={index}>
                  <p><strong>Message:</strong> {item.message}</p>
                  <p><strong>Description:</strong> {item.description}</p>
                </li>
              ))}
            </ul>
          </div>

        ) : (
            <div>
                {pageData && (
                  <div className="hero-info">
                    <h2>{pageData.message}</h2>
                    <img src={pageData.img} alt="Page" />
                    <p>
                      {pageData.description}
                    </p>
                  </div>
                )}
                  <div className="history-section">
                  <h2>Dashboard History</h2>
                  <ul>
                    {historyData.map((item, index) => (
                      <li key={index}>
                        {item.name}: {item.water_level}
                      </li>
                    ))}
                  </ul>
                </div></div>
        )}
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
  );
};

export default FirstPage;