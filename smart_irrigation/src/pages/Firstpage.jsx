import { useNavigate } from "react-router-dom";
import "../styles/Firstpage.css";

const FirstPage = () => {
  const navigate = useNavigate();

  return (
    <div className="first-page">
      {/* Paste your First Page HTML here */}
      <button onClick={() => navigate("/second")}>Go to Second Page</button>
    </div>
  );
};

export default FirstPage;