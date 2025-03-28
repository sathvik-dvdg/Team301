import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; // Add useState
import "../styles/Thirdpage.css";

const ThirdPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        location: "",
        moisture: "",
        ph: "",
        nitrogen: "",
        potassium: ""
    });

    // Add authentication check
    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            navigate('/login');
        }
    }, [navigate]);

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
                    <div className="input-group">
                        <input
                            type="text"
                            name="location"
                            placeholder="Enter your location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <input
                        type="text"
                        name="moisture"
                        placeholder="Enter Moisture (in %)"
                        value={formData.moisture}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="ph"
                        placeholder="Enter Ph Level"
                        value={formData.ph}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="nitrogen"
                        placeholder="Enter Nitrogen level (kg/ha)"
                        value={formData.nitrogen}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="potassium"
                        placeholder="Enter Potassium (kg/ha)"
                        value={formData.potassium}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">
                        View Report
                    </button>
                </form>

                <footer>
                    // ... existing footer code ...
                </footer>
            </main>
        </div>
    );
};

export default ThirdPage;