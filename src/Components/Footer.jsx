import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import express_shuttle_logo from "../assets/express_shuttle_logo.jpeg"

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <a href="https://express-shuttle-services.com/" target="_blank" rel="noreferrer">
                    <img className="footer_img" src={express_shuttle_logo} alt="footer-logo" style={{marginBottom: '10%'}} />
                </a>

                <ul className="footer-links">
                    <li><Nav.Link className='footer_link' as={Link} to="/home" eventKey="0">Home</Nav.Link></li>
                    <li><Nav.Link className='footer_link' as={Link} to="/rides" eventKey="1">Rides</Nav.Link></li>
                    <li><Nav.Link className='footer_link' as={Link} to="/ride_schedule" eventKey="2">Ride Schedule</Nav.Link></li>
                    <li><Nav.Link className='footer_link' as={Link} to="/locations" eventKey="3">Locations</Nav.Link></li>
                    <li><Nav.Link className='footer_link' as={Link} to="/messages" eventKey="4">Messages</Nav.Link></li>
                    <li><Nav.Link className='footer_link' as={Link} to="/users" eventKey="3">Users</Nav.Link></li>
                </ul>
            </div>
            <div className="footer-bottom">
                <p>copyright &copy; 2025 Express Shuttle Services, All Rights Reserved</p>
            </div>
        </div>
    )
};

export default Footer;