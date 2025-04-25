import { Link, useNavigate} from 'react-router-dom';
import '../Styles/Dashboard.css';
import { getDashboardData } from '../api/api';
import { useEffect, useState } from 'react';

const Dashboard = () => {  
    const navigate = useNavigate();
    // Get current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userName = `${currentUser.firstName} ${currentUser.lastName}` || "Guest";
    const userEmail = currentUser.email || "No email found";
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=8EB50B&color=fff&size=120&bold=true&font-size=0.5`;

    const handleLogout = () => {
        // Clear the currentUser from localStorage
        localStorage.removeItem('currentUser');
        // Navigate to the home page
        navigate('/');
    };
    const [dashboardData, setDashboardData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getDashboardData();
            setDashboardData(data);
          } catch (error) {
            console.error('Error fetching dashboard data:', error);
          }
        };
    
        fetchData();
      }, []);


    return (
        <div className="dashboard-container">
            <header className="dashboard-topbar">
                <Link to="/" className="dashboard-home-button" aria-label="Go to Home">⬅ Home</Link>
                <h1>Smart Irrigation System</h1>
            </header>
            <main className="dashboard-main">
                <div className="dashboard-card profile">
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
                        <a href={`mailto:${userEmail}`}>{userEmail}</a>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="dashboard-button dashboard-logout"
                        aria-label="Logout from the dashboard"
                    >
                        Logout
                    </button>
                </div>
                <div className="dashboard-cards">
                {dashboardData.map((item, index) => (
                  <div key={index} className="dashboard-card">
                    <div className="dashboard-card-content">
                      <h2>{item.name}</h2>
                      <p>
                        <strong>Water Level:</strong>
                        {item.water_level}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </main>
        </div>
    );
};

export default Dashboard; 