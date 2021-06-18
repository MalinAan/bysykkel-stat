import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {faLinkedin} from '@fortawesome/free-brands-svg-icons'
const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-container">
                <h3>Kontakt </h3>
                <ul className="contact-list">
                    <li className="contact-element">
                        <div className="icon"><FontAwesomeIcon icon={faEnvelope}/> </div>
                        <a href="mailto:malinaandahl@gmail.com">malinaandahl@gmail.com</a>
                    </li>
                    <li className="contact-element">
                            <div className="icon"><FontAwesomeIcon icon={faLinkedin}/> </div>
                            <a href="https://www.linkedin.com/in/malinaandahl/">Malin Aandahl</a>
                    </li>
                </ul>
            </div>
        </div>)}

export default Footer;