import { useEffect, useState } from "react";
import logo from "./assets/logo.png";
import "./index.css";

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 300);
  }, []);

  return (
    <div className="wrapper">
      <div className="glow"></div>

      <div className={`content ${loaded ? "show" : ""}`}>
        <img src={logo} alt="AVAC Horizons Logo" className="logo" />

        <h2 className="coming">COMING SOON</h2>

        <p className="sub">
          AVAC Horizons is preparing a bold new frontier of innovation,
          strategic expansion, and visionary leadership.
        </p>
      </div>
    </div>
  );
}

export default App;