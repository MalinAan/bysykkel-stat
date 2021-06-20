import logo from "./svg/bysykkel-logo.svg";
import React from "react";
import {Link} from "react-router-dom"

const Header = () => {
    return (
        <Link to="/" className="header">
            <div>
                <img className="header-logo" src={logo} alt="Header logo"/>
            </div>
            <div className="header-text">
                <h1>Statistikk</h1>
            </div>
        </Link>)
}

export default Header;