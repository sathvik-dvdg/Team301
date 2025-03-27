import "../Styles/Secondpage.css";

export default function Secondpage() {
  return (
    <div className="second-page">
      <div className="container">
        <div className="top">
          <div className="box1">
            <h2>Coordinates</h2>
            <p>Lat: 13.243152</p>
            <p>Lon: 78.223525</p>
          </div>
          <div className="box2">
            <h2>Temp</h2>
            <p>Current Temperature in city :</p>
            <p>Avg Temperature</p>
          </div>
        </div>
        <div className="bot">
          <h2>Soil Information</h2>
          <div className="soil">
            <p>Soil moisture:</p>
            <p>7.8%</p>
          </div>
          <div className="soil">
            <p>Ph level:</p>
            <p>7.8%</p>
          </div>
          <div className="soil">
            <p>Nitrogen Content:</p>
            <p>10%</p>
          </div>
          <div className="soil">
            <p>Phosphorous Content:</p>
            <p>5%</p>
          </div>
          <div className="soil">
            <p>Potassium Content:</p>
            <p>10%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
