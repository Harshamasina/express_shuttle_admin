import React, { useState } from "react";
import axios from "axios";
import { MutatingDots } from "react-loader-spinner";
import moment from "moment";

const CustomRevenue = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
    const [revenueData, setRevenueData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCustomRevenue = async () => {
        if (!startDate) {
            setError("Start Date is required.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${import.meta.env.VITE_LOCAL_API_URL}/api/custom_revenue`, {
                params: {
                    start_date: startDate,
                    end_date: endDate
                }
            });
            setRevenueData(res.data);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Error fetching custom revenue.");
            setRevenueData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <h3>Custom Revenue</h3>
            <div className="revenue_inputs">
                <div className="revenue_input">
                    <label>Select Start Date:</label>
                    <input
                        type="date"
                        name="start_date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="revenue_input">
                    <label>Select End Date:</label>
                    <input
                        type="date"
                        name="end_date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>

            <button className="revenue_button" onClick={fetchCustomRevenue}>Fetch Revenue</button>
            
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
            {revenueData && (
                <div className="revenue_info">
                    {/* <p><strong>Start Date:</strong> {revenueData.start_date}</p>
                    <p><strong>End Date:</strong> {revenueData.end_date}</p> */}
                    <p><strong>Total Revenue:</strong> ${revenueData.totalRevenue}</p>
                    <p><strong>Ride Count:</strong> {revenueData.rideCount}</p>
                </div>
            )}
        </section>
    );
};

export default CustomRevenue;
