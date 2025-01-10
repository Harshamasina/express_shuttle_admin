import { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Offcanvas } from 'react-bootstrap';
import express_shuttle_nav from "../assets/express_shuttle_nav.png";
import { LuSquareMenu } from "react-icons/lu";
import Home from '../Pages/Home';
import SearchBar from './SearchBar';
import Error404 from '../Pages/Error404';
import FetchRides from '../Pages/Rides/FetchRides';
import FetchLocations from '../Pages/Locations/FetchLocations';
import Messages from '../Pages/Messages';
import FetchUsers from '../Pages/Users/FetchUsers';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import FetchRideSchedule from '../Pages/Rides/FetchRideSchedule';

const Navbar = () => {
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleClose = () => setShowOffcanvas(false);
    const handleShow = () => setShowOffcanvas(true);

    return (
        <>
            <nav className="navbar navbar-expand-lg shadow-lg fixed-top">
                <div className="container-fluid d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <Link className="navbar-brand d-flex align-items-center me-3" to="/" aria-label='click to go to home page'>
                            <img src={express_shuttle_nav} alt='navbar_logo' className='navbar_img' />
                            <span className='img-span ms-2'>Admin</span>
                        </Link>
                        <span className='nav_menu_icon' onClick={handleShow} aria-label='open menu'>
                            <LuSquareMenu />
                        </span>
                    </div>
                    <div className='mx-auto d-none d-lg-block'>
                        <SearchBar />
                    </div>
                    <Link to='/login' className='navbar_button'>Login / Register</Link>
                </div>
            </nav>

            <Offcanvas show={showOffcanvas} onHide={handleClose} placement='start'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <img src={express_shuttle_nav} alt='navbar_logo' className='navbar_img' />
                        <span>Menu</span>
                    </Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <Link to="/" className="nav-link" onClick={handleClose}>Home</Link>
                    <Link to="/rides" className="nav-link" onClick={handleClose}>Rides</Link>
                    <Link to="/ride_schedule" className='nav-link' onClick={handleClose}>Ride Schedules</Link>
                    <Link to="/locations" className='nav-link' onClick={handleClose}>Locations</Link>
                    <Link to="/messages" className="nav-link" onClick={handleClose}>Messages</Link>
                    <Link to="/users" className="nav-link" onClick={handleClose}>Users</Link>
                </Offcanvas.Body>
            </Offcanvas>

            <>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='*' element={<Error404 />} />
                    <Route path='/rides' element={<FetchRides />} />
                    <Route path='/locations' element={<FetchLocations />} />
                    <Route path='/messages' element={<Messages />} />
                    <Route path='/users' element={<FetchUsers />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/ride_schedule' element={<FetchRideSchedule />} />
                </Routes>
            </>
        </>
    );
};

export default Navbar;