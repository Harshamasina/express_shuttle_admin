import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import data_not_found from '../../assets/data_not_found.jpg';
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

const FetchRideSchedule = () => {
    const [scheduleData, setScheduleData] = useState(null);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        const fetchScheduleData = async () => {
            try{
                const res = await axios.get(`${import.meta.env.VITE_LOCAL_API_URL}/api/fetch_all_routes`);
                setScheduleData(res.data);
            } catch (err) {
                setScheduleData(null);
                console.error(err);
                setErrMsg(err.response?.data?.error || "Error fetching ride details");
            }
        };
        fetchScheduleData();
    }, []);

    if (!scheduleData) {
        return (
            <div className="search_data_img">
                <img src={data_not_found} alt="search data error" />
                <h3>{errMsg}</h3>
            </div>
        );
    };

    return (
        <section>
            <h2>Route Schedules</h2>
            {
                scheduleData && scheduleData.map((route, index) => (
                    <div id={index} className="route_info_container">
                        <div className="ride_info">
                            <h3>{route?.ride}</h3>
                        </div>

                        <div className="update_ride_link_container">
                            <Link className="update_link" to={"/update_route/"+route._id}><FaRegEdit /> Update Route</Link>
                        </div>

                        <div className="ride_details">
                            <div className="ride_card">
                                <h4>Route Information</h4>
                                <p><span>Route: </span> {route?.from_location} → {route?.to_location}</p>
                                <p><span>Last Updated At: </span>{moment(route?.updatedAt).format('YYYY-MM-DD')}</p>
                            </div>

                            <div className="ride_card">
                                <h4>Pick Up Locations</h4>
                                {
                                    route?.pick_up.map((location, idx) => (
                                        <p key={idx}>{location}</p>
                                    ))
                                }
                            </div>

                            <div className="ride_card">
                                <h4>Drop off Locations</h4>
                                {
                                    route?.drop_off.map((location, idx) => (
                                        <p key={idx}>{location}</p>
                                    ))
                                }
                            </div>

                            <div className="ride_card">
                                <h4>Pick Up Times</h4>
                                {
                                    route?.pick_up_info.map((time, idx) => (
                                        <p key={idx}>{time.pick_up_time}</p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
        </section>
    )
};

export default FetchRideSchedule;