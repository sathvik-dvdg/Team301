import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Dashboard.css';

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
        // Navigate to the first page
        navigate('/');
    };

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
            </main>
        </div>
    );
};

export default Dashboard; 