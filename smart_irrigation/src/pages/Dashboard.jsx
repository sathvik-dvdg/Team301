import { Link } from 'react-router-dom';
import '../Styles/Dashboard.css';

const Dashboard = () => {
    // Generate UI Avatar based on user name
    const userName = "Roopesh Baliga";
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=8EB50B&color=fff&size=120&bold=true&font-size=0.5`;

    return (
        <div className="dashboard-container">
            <header className="dashboard-topbar">
                <Link to="/" className="dashboard-home-button" aria-label="Go to Home">⬅ Home</Link>
                <h1>Smart Irrigation System</h1>
            </header>
            <main className="dashboard-main">
                <div className="dashboard-card">
                    <Link to="/profile" title="View Profile">
                        <div className="dashboard-profile-img">
                            <img 
                                src={avatarUrl} 
                                alt={`Profile Picture of ${userName}`}
                            />
                        </div>
                    </Link>
                    <h2>{userName}</h2>
                    
                    <div className="dashboard-info">
                        <strong>Email:</strong> 
                        <a href="mailto:ROOP262005@GMAIL.COM">ROOP262005@GMAIL.COM</a>
                    </div>
                    <Link to="/logout" className="dashboard-button dashboard-logout" aria-label="Logout from the dashboard">
                        Logout
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default Dashboard; 