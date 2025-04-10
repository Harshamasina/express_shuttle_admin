import { useContext, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Offcanvas } from 'react-bootstrap';
import express_shuttle_nav from "../assets/express_shuttle_nav.png";
import { LuSquareMenu } from "react-icons/lu";
import Home from '../Pages/Home';
import SearchBar from './SearchBar';
import Error404 from '../Pages/Error404';
import FetchRides from '../Pages/Rides/FetchRides';
import Messages from '../Pages/Messages';
import FetchUsers from '../Pages/Users/FetchUsers';
import Login from '../Pages/Login';
import FetchRideSchedule from '../Pages/Schedules/FetchRideSchedule';
import Revenue from '../Pages/Revenue/Revenue';
import SearchRide from '../Pages/SearchRide';
import RideDetails from '../Pages/Rides/RideDetails';
import { AuthContext } from '../Context/AuthContext';
import SignoutButton from './SignoutButton';
import ProtectedRoute from './ProtectedRoute';
import FetchUserDetails from '../Pages/Users/FetchUserDetails';
import UpdateRide from '../Pages/Rides/UpdateRide';
import MyAccount from '../Pages/Admins/MyAccount';
import Register from '../Pages/Admins/Register';
import EmailLogin from '../Pages/EmailLogin';
import FetchRideCosts from '../Pages/Costs/FetchRideCosts';
import UpdateRideCost from '../Pages/Costs/UpdateRideCost';

const Navbar = () => {
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleClose = () => setShowOffcanvas(false);
    const handleShow = () => setShowOffcanvas(true);

    const { currentUser } = useContext(AuthContext);
    console.log(currentUser);

    return (
        <>
            <nav className="navbar navbar-expand-lg shadow-lg fixed-top">
                <div className="container-fluid d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <Link className="navbar-brand d-flex align-items-center me-3" to="/" aria-label='click to go to home page'>
                            <img src={express_shuttle_nav} alt='navbar_logo' className='navbar_img' />
                            <span className='img-span ms-2'>Admin</span>
                        </Link>
                        {
                            currentUser && (
                                <span className='nav_menu_icon' onClick={handleShow} aria-label='open menu'>
                                    <LuSquareMenu />
                                </span>
                            )
                        }
                    </div>
                    {
                        currentUser && (
                            <div className='mx-auto d-none d-lg-block'>
                                <SearchBar />
                            </div>
                        )
                    }
                    {
                        currentUser ? (
                            <Link to='/my_account' className='navbar_button'>My Account</Link>
                        ) : (
                            <Link to='/login' className='navbar_button'>Login</Link>
                        )
                    }
                </div>
            </nav>

            {currentUser && (
                <Offcanvas show={showOffcanvas} onHide={handleClose} placement='start'>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>
                            <img src={express_shuttle_nav} alt='navbar_logo' className='navbar_img' />
                        </Offcanvas.Title>
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                        <span className='offcanvas_span'>Menu</span>
                        <Link to="/" className="nav-link" onClick={handleClose}>Home</Link>
                        <Link to="/rides" className="nav-link" onClick={handleClose}>Rides</Link>
                        <Link to="/revenue" className='nav-link' onClick={handleClose}>Revenue</Link>
                        <Link to="/costs" className='nav-link' onClick={handleClose}>Costs</Link>
                        <Link to="/ride_schedule" className='nav-link' onClick={handleClose}>Ride Schedules</Link>
                        <Link to="/messages" className="nav-link" onClick={handleClose}>Messages</Link>
                        <Link to="/users" className="nav-link" onClick={handleClose}>Users</Link>
                        <Link to="/register" className='nav-link' onClick={handleClose}>Register Admin</Link>
                    </Offcanvas.Body>
                </Offcanvas>
            )}

            <>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='*' element={<Error404 />} />
                    <Route path='/rides' element={<ProtectedRoute><FetchRides /></ProtectedRoute>} />
                    <Route path='/messages' element={<ProtectedRoute><Messages /></ProtectedRoute>} />
                    <Route path='/users' element={<ProtectedRoute><FetchUsers /></ProtectedRoute>} />
                    <Route path='/user_details/:uid' element={<ProtectedRoute><FetchUserDetails /></ProtectedRoute>} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/email_login' element={<EmailLogin />} />
                    <Route path='/register' element={<ProtectedRoute><Register /></ProtectedRoute>} />
                    <Route path='/my_account' element={<ProtectedRoute><MyAccount /></ProtectedRoute>} />
                    <Route path='/revenue' element={<ProtectedRoute><Revenue /></ProtectedRoute>} />
                    <Route path='/costs' element={<ProtectedRoute><FetchRideCosts /></ProtectedRoute>} />
                    <Route path='/update_ride_cost/:id' element={<ProtectedRoute><UpdateRideCost /></ProtectedRoute>} />
                    <Route path='/ride_schedule' element={<ProtectedRoute><FetchRideSchedule /></ProtectedRoute>} />
                    <Route path='/search_ride/:key' element={<ProtectedRoute><SearchRide /></ProtectedRoute>} />
                    <Route path='/update_ride/:key' element={<ProtectedRoute><UpdateRide /></ProtectedRoute>} />
                    <Route path='/ride_details/:key' element={<ProtectedRoute><RideDetails /></ProtectedRoute>} />
                </Routes>
            </>
        </>
    );
};

export default Navbar;