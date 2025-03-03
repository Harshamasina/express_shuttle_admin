import axios from 'axios';
import { useEffect, useState } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import moment from "moment";
import { Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiFillPrinter } from "react-icons/ai";

const FetchRides = () => {
    const [rides, setRides] = useState({});
    const [searchDate, setSearchDate] = useState(moment().format("YYYY-MM-DD"));
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    const [showDateInput, setShowDateInput] = useState(false);

    useEffect(() => {
        const getRides = async () => {
        setLoading(true);
        setErrMsg(null);
        try {
            const res = await axios.get(
            `${import.meta.env.VITE_LOCAL_API_URL}/api/fetch_rides_by_date/${searchDate}`
            );
            setRides(res.data.routes || {});
        } catch (err) {
            console.error(err);
            setErrMsg(err.response?.data?.message || "Failed to fetch rides");
            setRides({});
        } finally {
            setLoading(false);
        }
        };
        getRides();
    }, [searchDate]);

    const handleToday = () => {
        setSearchDate(moment().format("YYYY-MM-DD"));
    };

    const handleTomorrow = () => {
        setSearchDate(moment().add(1, "days").format("YYYY-MM-DD"));
    };

    const handleDateChange = (e) => {
        setSearchDate(e.target.value);
    };

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <div>
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
        );
    }

    return (
        <section className="message_section">
            <div id='printableArea'>
                <h2 id='print-title'>Shuttle Rides on "{searchDate}"</h2>
            </div>
        
            <span onClick={handlePrint}><AiFillPrinter /> Print Schedule</span>

            <div className="msg_buttons">
                <ButtonGroup className="button_group" aria-label="Basic example">
                <Button className="msg_button" onClick={handleToday}>
                    Today's Rides ({moment().format("YYYY-MM-DD")})
                </Button>
                <Button className="msg_button" onClick={handleTomorrow}>
                    Tomorrow's Rides ({moment().add(1, 'days').format("YYYY-MM-DD")})
                </Button>
                <Button className="msg_button" onClick={() => setShowDateInput(!showDateInput)}>
                    Custom Date Rides
                </Button>
                </ButtonGroup>
            </div>

            {showDateInput && (
                <div className="input_date">
                <label htmlFor="input_date">Select Date: </label>
                <input
                    type="date"
                    className="ride_datepicker"
                    value={searchDate}
                    onChange={handleDateChange}
                    id="input_date"
                />
                </div>
            )}

            {errMsg && <p className="error-message">{errMsg}</p>}

            {/* This is the schedule area */}
            <div id="printableArea">
                {Object.entries(rides).map(([route, timesData]) => (
                    <div key={route} className="route-section">
                        <h2>{route}</h2>
                        {Array.isArray(timesData) ? (
                        timesData.length > 0 ? (
                            timesData.map((item, idx) => {
                            const { time, trips } = item;
                            return (
                                <div key={idx} className="table_container">
                                <h3>{time || `Time: ${idx}`}</h3>
                                <table className="rides_table">
                                    <thead>
                                    <tr>
                                        <th>Trip Type</th>
                                        <th>Ticket ID</th>
                                        <th>Pickup</th>
                                        <th>Drop Off</th>
                                        <th>Airline</th>
                                        <th>Travelers</th>
                                        <th>Contact Name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Notes</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {Array.isArray(trips) && trips.length > 0 ? (
                                        trips.map((trip, i) => (
                                        <tr key={i}>
                                            <td>{trip.trip_type || "N/A"}</td>
                                            <td>{trip.ticket_id || "N/A"}</td>
                                            <td>{trip.pick_up || "N/A"}</td>
                                            <td>{trip.drop_off || "N/A"}</td>
                                            <td>{trip.traveler_count || "N/A"}</td>
                                            <td>{trip.acc_name || "N/A"}</td>
                                            <td>{trip.acc_phone || "N/A"}</td>
                                            <td>{trip.acc_email || "N/A"}</td>
                                            <td>{trip.notes || "N/A"}</td>
                                        </tr>
                                        ))
                                    ) : (
                                        <tr>
                                        <td colSpan="10">No rides available</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                                </div>
                            );
                            })
                    ) : (
                        <p>No times found for this route.</p>
                    )
                    ) : (
                    Object.keys(timesData).length > 0 ? (
                        Object.entries(timesData).map(([timeLabel, trips]) => (
                        <div key={timeLabel} className="table_container">
                            <h3>{timeLabel}</h3>
                            <table className="rides_table">
                            <thead>
                                <tr>
                                <th>Trip Type</th>
                                <th>Ticket ID</th>
                                <th>Pickup</th>
                                <th>Drop Off</th>
                                <th>Travelers</th>
                                <th>Contact Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(trips) && trips.length > 0 ? (
                                trips.map((trip, i) => (
                                    <tr key={i}>
                                    <td>{trip.trip_type || "N/A"}</td>
                                    <td>
                                        {trip.ticket_id ? (
                                        <Link className="box_link" to={`/ride_details/${trip.ticket_id}`}>
                                            {trip.ticket_id || "N/A"}
                                        </Link>
                                        ) : (
                                        "N/A"
                                        )}
                                    </td>
                                    <td>{trip.pick_up || "N/A"}</td>
                                    <td>{trip.drop_off || "N/A"}</td>
                                    <td>{trip.traveler_count || "N/A"}</td>
                                    <td>{trip.acc_name || "N/A"}</td>
                                    <td>{trip.acc_phone || "N/A"}</td>
                                    <td>{trip.acc_email || "N/A"}</td>
                                    <td>{trip.notes || "N/A"}</td>
                                    </tr>
                                ))
                                ) : (
                                <tr>
                                    <td colSpan="10">No rides available</td>
                                </tr>
                                )}
                            </tbody>
                            </table>
                        </div>
                        ))
                    ) : (
                        <p>No times found for this route.</p>
                    )
                    )}
                </div>
                ))}
            </div>
        </section>
    );
};

export default FetchRides;
