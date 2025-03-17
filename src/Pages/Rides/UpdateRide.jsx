import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import moment from "moment";

const UpdateRide = () => {
    const { key } = useParams();

    // Store the updated values here
    const [updateRide, setUpdateRide] = useState({
        pick_up: "",
        pick_up_date: "",
        pick_up_time: "",
        drop_off: "",
        return_pick_up: "",
        return_drop_off: "",
        return_pick_up_date: "",
        return_pick_up_time: ""
    });

    // Original details fetched from server
    const [rideDetails, setRideDetails] = useState({});
    const [routeDetails, setRouteDetails] = useState({});
    const [errMsg, setErrMsg] = useState("");

    // Fetch the existing ride details
    useEffect(() => {
        const fetchRideDetails = async () => {
            if (!key) {
                setRideDetails(null);
                setErrMsg("Invalid Request");
                return;
            }
            try {
                const res = await axios.get(`${import.meta.env.VITE_LOCAL_API_URL}/api/fetch_update_ride_details/${key}`);
                setRideDetails(res.data);
                setErrMsg("");
            } catch (err) {
                setRideDetails(null);
                console.error(err);
                setErrMsg(err.response?.data?.error || "Error fetching ride details");
            }
        };
        fetchRideDetails();
    }, [key]);

    // Once rideDetails is fetched, set updateRide with those values
    useEffect(() => {
        if (rideDetails) {
            setUpdateRide(prev => ({
                ...prev,
                pick_up: rideDetails.pick_up || "",
                pick_up_date: rideDetails.pick_up_date || "",
                pick_up_time: rideDetails.pick_up_time || "",
                drop_off: rideDetails.drop_off || "",
                return_pick_up: rideDetails.return_pick_up || "",
                return_drop_off: rideDetails.return_drop_off || "",
                return_pick_up_date: rideDetails.return_pick_up_date || "",
                return_pick_up_time: rideDetails.return_pick_up_time || ""
            }));
        }
    }, [rideDetails]);

    // Fetch route details (the lists of possible pick_up, drop_off, etc.)
    useEffect(() => {
        const fetchRouteDetails = async () => {
            try {
                const { from_location, to_location, trip_type } = rideDetails || {};
                if (!from_location || !to_location || !trip_type) return;

                const res = await axios.get(`${import.meta.env.VITE_LOCAL_API_URL}/api/route_details`, {
                params: { to_location, from_location, trip_type }
                });
                setRouteDetails(res.data);
            } catch (err) {
                setRouteDetails(null);
                console.error(err);
                setErrMsg(err.response?.data?.error || "Error fetching route details");
            }
        };
        fetchRouteDetails();
    }, [rideDetails]);

    // Handle form input changes
    const handleInputs = (e) => {
        const { name, value } = e.target;
        setUpdateRide((prevState) => ({
        ...prevState,
        [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const today = moment().startOf('day');
        const pickUpDate = moment(updateRide.pick_up_date).startOf('day');

        if(pickUpDate.isBefore(today)){
            setErrMsg("Pick-Up Date cannot be before today.");
            return
        }

        if(rideDetails.trip_type === 'return'){
            const returnPickUpDate = moment(updateRide.return_pick_up_date).startOf('day');

            if(returnPickUpDate.isBefore(today)){
                setErrMsg("Return Pick-Up Date cannot be before today.");
                return
            }

            if(returnPickUpDate.isBefore(pickUpDate)){
                setErrMsg("Return Pick-Up Date cannot be before the Pick-Up Date.");
                return
            }
        }

        const isConfirmed = window.confirm("Are you sure you want to update?");
        if (!isConfirmed) return;

        try {
            const res = await axios.patch(
                `${import.meta.env.VITE_LOCAL_API_URL}/api/update_ride_details/${key}`,
                updateRide
            );
            alert("Ride successfully updated!");
            console.log("Server response:", res.data);
        } catch (err) {
            console.error(err);
            setErrMsg(err.response?.data?.error || "Falied to update ride details");
            alert(err.response?.data?.message || "Failed to update ride details");
        }
    };

    const tripType = rideDetails?.trip_type;

    return (
        <section className="update_ride">
            <div className="ride_info">
                <h3>
                Update Ride Details for <span>{key}</span>
                </h3>
            </div>

            {
                !rideDetails && errMsg ? (
                    ""
                ) : (
                    <div className="update_ride_form_container">
                        <p>Trip Type: {tripType}</p>
                        <form className="update_ride_form" onSubmit={handleUpdate}>
                            <div className="input_group">
                                <label>Pick Up Date</label>
                                <input
                                    type="date"
                                    name="pick_up_date"
                                    value={updateRide.pick_up_date}
                                    onChange={handleInputs}
                                />
                            </div>

                            <div className="input_group">
                                <label>Pick Up Time</label>
                                <select
                                    name="pick_up_time"
                                    value={updateRide.pick_up_time}
                                    onChange={handleInputs}
                                >
                                <option value="" disabled>Select a time</option>
                                {routeDetails.pick_up_times?.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                                </select>
                            </div>

                            <div className="input_group">
                                <label>Pick Up Location</label>
                                <select
                                    name="pick_up"
                                    value={updateRide.pick_up}
                                    onChange={handleInputs}
                                >
                                <option value="" disabled>Select Pick Up Location</option>
                                {routeDetails.pick_up?.map((location) => (
                                    <option key={location} value={location}>
                                    {location}
                                    </option>
                                ))}
                                </select>
                            </div>

                            <div className="input_group">
                                <label>Drop Off</label>
                                <select
                                    name="drop_off"
                                    value={updateRide.drop_off}
                                    onChange={handleInputs}
                                >
                                <option value="" disabled>Select Drop Off Location</option>
                                {routeDetails.drop_off?.map((location) => (
                                    <option key={location} value={location}>
                                    {location}
                                    </option>
                                ))}
                                </select>
                            </div>

                            {/* Only show return fields if trip_type == "return" */}
                            {tripType === "return" && (
                                <>
                                <div className="input_group">
                                    <label>Return Pick Up Date</label>
                                    <input
                                        type="date"
                                        name="return_pick_up_date"
                                        value={updateRide.return_pick_up_date}
                                        onChange={handleInputs}
                                    />
                                </div>

                                <div className="input_group">
                                    <label>Return Pick Up Time</label>
                                    <select
                                        name="return_pick_up_time"
                                        value={updateRide.return_pick_up_time}
                                        onChange={handleInputs}
                                    >
                                    <option value="" disabled>Select a time</option>
                                    {routeDetails.return_pick_up_times?.map((time) => (
                                        <option key={time} value={time}>
                                        {time}
                                        </option>
                                    ))}
                                    </select>
                                </div>

                                <div className="input_group">
                                    <label>Return Pick Up Location</label>
                                    <select
                                        name="return_pick_up"
                                        value={updateRide.return_pick_up}
                                        onChange={handleInputs}
                                    >
                                    <option value="" disabled>Select Return Pick Up</option>
                                    {routeDetails.return_pick_up?.map((location) => (
                                        <option key={location} value={location}>
                                        {location}
                                        </option>
                                    ))}
                                    </select>
                                </div>

                                <div className="input_group">
                                    <label>Return Drop Off</label>
                                    <select
                                        name="return_drop_off"
                                        value={updateRide.return_drop_off}
                                        onChange={handleInputs}
                                    >
                                    <option value="" disabled>Select Return Drop Off</option>
                                    {routeDetails.return_drop_off?.map((location) => (
                                        <option key={location} value={location}>
                                        {location}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                                </>
                            )}

                            <div className="button_container">
                                <button type="submit">Update Ride</button>
                            </div>
                        </form>
                    </div>
                )
            }
            {errMsg && <p className="err_msg">{errMsg}</p>}
        </section>
    );
};

export default UpdateRide;
