import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import data_not_found from '../assets/data_not_found.jpg';

const SearchRide = () => {
    const { key } = useParams();
    const [searchData, setSearchData] = useState([]);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        const fetchSearchData = async () => {
            if(key){
                try{
                    const res = await axios.get(`${import.meta.env.VITE_LOCAL_API_URL}/api/search_rides/${key.replaceAll("/", "%2F")}`);
                    setSearchData(res.data);
                } catch (err) {
                    setSearchData([]);
                    console.error(err);
                    setErrMsg(err.response.data.error);
                }
            } else {
                setSearchData([]);
                setErrMsg("Invalid Request");
            }
        };
        fetchSearchData();
    }, []);

    console.log(searchData);

    return (
        <div className="search_page">
            <div className="search_page_info">
                <h2>Rides for {key}</h2>
                <h3>Found {searchData && searchData.length} Rides</h3>
            </div>

            <div className="search_data_container">
                <div className="search_data">
                    {
                        (searchData && searchData.length === 0 && key) ?
                        <div className="search_data_img">
                            <img src={data_not_found} alt="search data error" />
                            <h3>{errMsg}</h3>
                        </div> :
                        searchData && searchData.map((ride, i) => (
                            <div className="box" key={i}>
                                <h4>{ride?.ticket_id}</h4>
                                <p>Trip Type: <span>{ride?.trip_type}</span></p>
                                <p>Amount: <span>{ride?.total_amount}</span></p>
                                <p>Payment ID: <span>{ride?.payment_result.payment_id}</span></p>
                                <p>Payment Status: <span>{ride?.payment_result.payment_status}</span></p>
                                <p>Pick Up Date: <span>{ride?.pick_up_date}</span></p>
                                <p>Pick Up Location: <span>{ride?.from_location}</span></p>
                                <Link className="box_link" to={"/ride_details/"+ride?.ticket_id}>More Details</Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};

export default SearchRide;