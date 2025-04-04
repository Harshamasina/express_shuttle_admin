import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import express_shuttle_logo from "../assets/express_shuttle_logo.jpeg"
import GoToTop from "./GoToTop";
import { AuthContext } from '../Context/AuthContext';
import { useContext } from "react";

const Footer = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="footer">
            <div className="footer-content">
                <a href="https://express-shuttle-services.com/" target="_blank" rel="noreferrer">
                    <img className="footer_img" src={express_shuttle_logo} alt="footer-logo" style={{marginBottom: '10%'}} />
                </a>

                {
                    currentUser && (
                        <ul className="footer-links">
                            <li><Nav.Link className='footer_link' as={Link} to="/home" eventKey="0">Home</Nav.Link></li>
                            <li><Nav.Link className='footer_link' as={Link} to="/rides" eventKey="1">Rides</Nav.Link></li>
                            <li><Nav.Link className='footer_link' as={Link} to="/revenue" eventKey="2">Revenue</Nav.Link></li>
                            <li><Nav.Link className='footer_link' as={Link} to="/costs" eventKey="3">Costs</Nav.Link></li>
                            <li><Nav.Link className='footer_link' as={Link} to="/ride_schedule" eventKey="4">Schedules</Nav.Link></li>
                            <li><Nav.Link className='footer_link' as={Link} to="/messages" eventKey="5">Messages</Nav.Link></li>
                            <li><Nav.Link className='footer_link' as={Link} to="/users" eventKey="6">Users</Nav.Link></li>
                        </ul>
                    )
                }
            </div>
            <div className="footer-bottom">
                <p>copyright &copy; 2025 Express Shuttle Services, All Rights Reserved</p>
            </div>
            <GoToTop />
        </div>
    )
};

export default Footer;