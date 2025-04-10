import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { MutatingDots } from 'react-loader-spinner';
import moment from "moment";

const FetchUserDetails = () => {
    const { uid } = useParams();
    const [loading, setLoading] = useState(true);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get(`${import.meta.env.VITE_LOCAL_API_URL}/api/fetch_fb_id/${uid}`);
                setLoading(false);
                setAccount(res.data);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const today = moment();
    const upcomingRides = account?.past_rides?.filter(ride => 
        moment(ride.pick_up_date, "YYYY-MM-DD").isAfter(today)
    ) || [];
    const pastRides = account?.past_rides?.filter(ride => 
        moment(ride.pick_up_date, "YYYY-MM-DD").isBefore(today)
    ) || [];

    const userType = {
        S: "Student",
        V: "Veteran",
        SC: "Senior Citizen",
        O: "Other"
    };

    const userTypeDisplay = userType[account?.user_type] || "Unknown";

    if(loading){
        return <div>
            <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#e5be5c"
                secondaryColor="#3a464e"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass="loader"
            />
        </div>
    };

    return (
        <section>
            <h2>User Details for {account?.email}</h2>

            <div className='account_container'>
                <div className='main-body'>
                    <div className="row gutters-sm">
                        <div className="col-md-8">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Full Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <p>{account?.name}</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Date of Birth</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <p>{account?.dob}</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Phone</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <p>{account?.phone}</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <p>{account?.email}</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Address</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <p>{account?.address}</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Category</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <p>{userTypeDisplay}</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            </div>

                            <div>
                                <h5>Upcoming Rides</h5>
                                <div className='row'>
                                {upcomingRides.length > 0 ? (
                                    upcomingRides.map((ride, index) => (
                                        <div key={index} className='col-sm-6 mb-3'>
                                            <div className="card h-100">
                                                <div className='card-body'>
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Payment Amount</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>${ride.total_amount}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Ticket ID</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.ticket_id}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Payment Ref ID</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.payment_ref_id}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Trip Type</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.trip_type}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Persons Count</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.personCount}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Booking Date</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.booking_date}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">City</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.from_location}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Pick Up Location</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.pick_up}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Pickup Date and Time</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.pick_up_date}, {ride.pick_up_time}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Drop off City</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.to_location}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Drop off Location</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.drop_off}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    
                                                    {ride.trip_type === 'return' && (
                                                        <>
                                                           <div className='row'>
                                                                <div className="col-sm-4">
                                                                    <h6 className="mb-0">Return Pickup</h6>
                                                                </div>
                                                                <div className="col-sm-8 text-secondary">
                                                                    <p>{ride.return_pick_up}</p>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className='row'>
                                                                <div className="col-sm-4">
                                                                    <h6 className="mb-0">Return Pickup Date & Time</h6>
                                                                </div>
                                                                <div className="col-sm-8 text-secondary">
                                                                    <p>{ride.return_pick_up_date}, {ride.return_pick_up_time}</p>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className='row'>
                                                                <div className="col-sm-4">
                                                                    <h6 className="mb-0">Return Drop Off</h6>
                                                                </div>
                                                                <div className="col-sm-8 text-secondary">
                                                                    <p>{ride.return_drop_off}</p>
                                                                </div>
                                                            </div>
                                                            <hr /> 
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No upcoming rides.</p>
                                )}
                                </div>
                            </div>
                            
                            <div>
                                <h5>Past Rides</h5>
                                <div className='row'>
                                {pastRides.length > 0 ? (
                                    pastRides.map((ride, index) => (
                                        <div key={index} className='col-sm-6 mb-3'>
                                            <div className="card h-100">
                                                <div className='card-body'>
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Payment Amount</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>${ride.total_amount}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Ticket ID</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.ticket_id}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Payment Ref ID</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.payment_ref_id}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Trip Type</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.trip_type}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Persons Count</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.personCount}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Booking Date</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.booking_date}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">City</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.from_location}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Pick Up Location</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.pick_up}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Pickup Date and Time</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.pick_up_date}, {ride.pick_up_time}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Drop off City</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.to_location}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Drop off Location</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.drop_off}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    
                                                    {ride.trip_type === 'return' && (
                                                        <>
                                                           <div className='row'>
                                                                <div className="col-sm-4">
                                                                    <h6 className="mb-0">Return Pickup</h6>
                                                                </div>
                                                                <div className="col-sm-8 text-secondary">
                                                                    <p>{ride.return_pick_up}</p>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className='row'>
                                                                <div className="col-sm-4">
                                                                    <h6 className="mb-0">Return Pickup Date Time</h6>
                                                                </div>
                                                                <div className="col-sm-8 text-secondary">
                                                                    <p>{ride.return_pick_up_date}, {ride.return_pick_up_time}</p>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className='row'>
                                                                <div className="col-sm-4">
                                                                    <h6 className="mb-0">Return Drop Off</h6>
                                                                </div>
                                                                <div className="col-sm-8 text-secondary">
                                                                    <p>{ride.return_drop_off}</p>
                                                                </div>
                                                            </div>
                                                            <hr /> 
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No past rides.</p>
                                )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default FetchUserDetails;