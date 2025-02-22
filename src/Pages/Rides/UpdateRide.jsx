import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const UpdateRide = () => {
    const { key } = useParams();

    const [rideDetails, setRideDetails] = useState({});
    const [routeDetails, setRouteDetails] = useState({});
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        const fetchRideDetails = async () => {
            if(!key){
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

    useEffect(() => {
        const fetchRouteDetails = async () => {
            try{
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

    console.log(rideDetails);

    return (
        <section className="update_ride">
            <div className="ride_info">
                <h3>Update Ride Details for <span>{key}</span></h3>
            </div>

            <div className="update_ride_form_container">
                <form className="update_ride_form">
                    
                </form>
            </div>
        </section>
    )
};

export default UpdateRide;