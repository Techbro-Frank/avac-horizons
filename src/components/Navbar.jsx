import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <img src={logo} alt="AVAC Horizons Logo" className="logo" />
    </nav>
  );
}

export default Navbar;