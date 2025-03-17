import React, { useState, useEffect } from "react";
import axios from "axios";
import { MutatingDots } from "react-loader-spinner";
import moment from "moment";

const FetchMonthRevenue = () => {
    const defaultMonth = moment().format("YYYY-MM");
    const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
    const [revenueData, setRevenueData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRevenue = async (monthValue) => {
        if (monthValue) {
            const year = moment(monthValue, "YYYY-MM").format("YYYY");
            const month = moment(monthValue, "YYYY-MM").format("M"); // month as 1-12
            setLoading(true);
            try {
                const res = await axios.get(`${import.meta.env.VITE_LOCAL_API_URL}/api/fetch_month_revenue`, {
                    params: { year, month }
                });
                setRevenueData(res.data);
                setError(null);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Error fetching revenue data.");
                setRevenueData(null);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchRevenue(defaultMonth);
    }, [defaultMonth]);

    const handleChange = async (e) => {
        const monthValue = e.target.value;
        setSelectedMonth(monthValue);
        await fetchRevenue(monthValue);
    };

    return (
        <section>
            <h3>Revenue Till Now: ${revenueData?.roundedRevenue}</h3>
            <div className="revenue_input">
                <input 
                    type="month" 
                    name="month" 
                    value={selectedMonth} 
                    onChange={handleChange} 
                />
            </div>
            
            {loading && (
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
            )}
            {error && <p className="error">{error}</p>}
        </section>
    );
};

export default FetchMonthRevenue;
