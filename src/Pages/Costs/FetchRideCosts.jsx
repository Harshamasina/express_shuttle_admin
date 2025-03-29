import { useState, useEffect } from "react";
import { MutatingDots } from 'react-loader-spinner';
import axios from 'axios';
import { Link } from "react-router-dom";
import { MdEditSquare } from "react-icons/md";

const FetchRideCosts = () => {
    const [rideCostData, setRideCostData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get(`${import.meta.env.VITE_LOCAL_API_URL}/api/ride_costs`);
                setLoading(false);
                setRideCostData(res.data);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

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
            <h2>Ride Costs</h2>

            <div className="ride_costs_table">
                <div className="table_container">
                    <table className="users_table">
                        <thead>
                            <tr>
                                <th>From Location</th>
                                <th>To Location</th>
                                <th>One Way</th>
                                <th>Two Way</th>
                                <th>Tax Rate</th>
                                <th>Update Ride</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                rideCostData && rideCostData.map((cost, index) => (
                                    <tr key={index}>
                                        <td>{cost?.from_location}</td>
                                        <td>{cost?.to_location}</td>
                                        <td>${cost?.oneway_cost}</td>
                                        <td>${cost?.return_cost}</td>
                                        <td>{cost?.tax_rate}%</td>
                                        <td><Link className="user_link" to={"/update_ride_cost/"+cost?._id}><MdEditSquare /></Link></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
};

export default FetchRideCosts;