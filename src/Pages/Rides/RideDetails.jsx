import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import data_not_found from '../../assets/data_not_found.jpg';
import { FaRegEdit } from "react-icons/fa";

const RideDetails = () => {
    const { key } = useParams();
    const [rideData, setRideData] = useState(null);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        const fetchRideData = async () => {
            if (key) {
                try {
                    const res = await axios.get(`${import.meta.env.VITE_LOCAL_API_URL}/api/fetch_ride/${key.replaceAll("/", "%2F")}`);
                    setRideData(res.data);
                } catch (err) {
                    setRideData(null);
                    console.error(err);
                    setErrMsg(err.response?.data?.error || "Error fetching ride details");
                }
            } else {
                setRideData(null);
                setErrMsg("Invalid Request");
            }
        };
        fetchRideData();
    }, [key]);

    if (!rideData) {
        return (
            <div className="search_data_img">
                <img src={data_not_found} alt="search data error" />
                <h3>{errMsg}</h3>
            </div>
        );
    };

    return (
        <section>
            <div className="ride_info_container">
                <div className="ride_info">
                    <h3>Ride Details for Ticket ID: <span>{rideData.ticket_id}</span></h3>
                </div>

                <div className="update_ride_link_container">
                    <Link className="update_link" to={"/update_ride/"+key}><FaRegEdit /> Update Ride</Link>
                </div>

                <div className="ride_details">
                    {/* Trip Details */}
                    <div className="ride_card">
                        <h4>Trip Information</h4>
                        <p><span>Route:</span> {rideData.from_location} → {rideData.to_location}</p>
                        <p><span>Pick-up:</span> {rideData.pick_up} at {rideData.pick_up_time} on {rideData.pick_up_date}</p>
                        <p><span>Drop-off:</span> {rideData.drop_off}</p>
                        {rideData.trip_type === "return" && (
                            <>
                                <p><span>Return Pick-up:</span> {rideData.return_pick_up} at {rideData.return_pick_up_time} on {rideData.return_pick_up_date}</p>
                                <p><span>Return Drop-off:</span> {rideData.return_drop_off}</p>
                            </>
                        )}
                        <p><span>Trip Type:</span> {rideData.trip_type}</p>
                        <p><span>Airline:</span> {rideData.airline}</p>
                    </div>

                    {/* Payment Details */}
                    <div className="ride_card">
                        <h4>Payment Information</h4>
                        <p><span>Payment ID:</span> {rideData.payment_result.payment_id}</p>
                        <p><span>Status:</span> {rideData.payment_result.payment_status}</p>
                        <p><span>Paid At:</span> {new Date(rideData.payment_result.paid_at).toLocaleString()}</p>
                        <p><span>Payment Mail:</span> {rideData.payment_result.payment_email}</p>
                        <p><span>Total Amount:</span> ${rideData.total_amount}</p>
                        <p><span>Tax Amount:</span> ${((rideData.total_amount - rideData.base_amount).toFixed(2))}</p>
                    </div>

                    {/* Traveler Details */}
                    <div className="ride_card">
                        <h4>Traveler Information</h4>
                        <p><span>Traveler Count:</span> {rideData.traveler_count}</p>
                        <p><span>Booked By:</span> {rideData.acc_email}</p>
                        <p><span>Contact Number:</span> {rideData.acc_phone}</p>
                    </div>

                    {/* Additional Details */}
                    <div className="ride_card">
                        <h4>Additional Information</h4>
                        <p><span>Booking Date:</span> {rideData.booking_date}</p>
                        <p><span>Notes:</span> {rideData.notes || "N/A"}</p>
                        <p><span>Last Updated:</span> {new Date(rideData.updatedAt).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RideDetails;
