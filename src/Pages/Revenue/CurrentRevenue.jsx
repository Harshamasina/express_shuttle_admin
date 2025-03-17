import { useState, useEffect } from "react";
import { MutatingDots } from 'react-loader-spinner';
import axios from 'axios';

const CurrentRevenue = () => {
    const [revenueData, setRevenueData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get(`${import.meta.env.VITE_LOCAL_API_URL}/api/fetch_current_revenue`);
                setLoading(false);
                setRevenueData(res.data);
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
            <h2>Revenue</h2>

            <div className="revenue_container">
                <div className="revenue_box">
                    <h3>Today's Revenue</h3>
                    <span>${revenueData?.today}</span>
                </div>
                <div className="revenue_box">
                    <h3>Current Week Revenue</h3>
                    <span>${revenueData?.week}</span>
                </div>
                <div className="revenue_box">
                    <h3>Current Month Revenue</h3>
                    <span>${revenueData?.month}</span>
                </div>
            </div>
        </section>
    )
};

export default CurrentRevenue;