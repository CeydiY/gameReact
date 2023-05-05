import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../css/navbar.css";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            Logo
            <i className="fas fa-code"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/tamagotchi"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}>
                Tamagotchi
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/lagarto"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}>
                Lagarto-Spock
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/records"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}>
                Records
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
