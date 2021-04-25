import logo from "./svg/bysykkel-logo.svg";
import React from "react";
const Header = () => {
    return (
<div className="header">
    <div>
        <img className="header-logo" src={logo} alt="Header logo"/>
    </div>
    <div className="header-text">
        <h1>Statistikk</h1>
    </div>
</div>)}

export default Header;