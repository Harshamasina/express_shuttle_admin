import { useEffect, useState } from "react";
import axios from "axios";

const FetchLocations = () => {
    const [locations,setLocations] = useState([]);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        const fetchLocations = async () => {
            try{
                const res = await axios.get(`${import.meta.env.VITE_LOCAL_API_URL}/api/fetch_ride`);
                setLocations(res.data);
            } catch (err) {
                console.error(err);
                setErrMsg(err.response?.data?.error || "Error fetching ride details");
            }
        };
        fetchLocations();
    }, [])

    return (
        <div>
            <h1>Fetch Locations</h1>
        </div>
    )
};

export default FetchLocations;