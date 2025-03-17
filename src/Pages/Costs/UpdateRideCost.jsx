import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const UpdateRideCost = () => {
    const { id } = useParams();

    // Store the fields to update: oneway_cost, return_cost, and tax_rate.
    const [updateRideCost, setUpdateRideCost] = useState({
        oneway_cost: "",
        return_cost: "",
        tax_rate: ""
    });

    const [rideCostDetails, setRideCostDetails] = useState({});
    const [errMsg, setErrMsg] = useState("");
    console.log(id);

    useEffect(() => {
        const fetchRideCostDetails = async () => {
            if (!id) {
                setRideCostDetails(null);
                setErrMsg("Invalid Request");
                return;
            }
            try {
                const res = await axios.get(`${import.meta.env.VITE_LOCAL_API_URL}/api/fetch_ride_cost_id/${id}`);
                setRideCostDetails(res.data);
                setUpdateRideCost({
                    oneway_cost: res.data.oneway_cost,
                    return_cost: res.data.return_cost,
                    tax_rate: res.data.tax_rate
                });
                setErrMsg("");
            } catch (err) {
                console.error(err);
                setRideCostDetails(null);
                setErrMsg(err.response?.data?.message || "Error fetching ride cost details");
            }
        };
        fetchRideCostDetails();
    }, [id]);

    // Handle form input changes.
    const handleInputs = (e) => {
        const { name, value } = e.target;
        setUpdateRideCost((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission to update ride cost details.
    const handleUpdate = async (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm("Are you sure you want to update?");
        if (!isConfirmed) return;

        try {
            const res = await axios.patch(
                `${import.meta.env.VITE_LOCAL_API_URL}/api/update_ride_costs/${id}`,
                updateRideCost
            );
            alert("Ride Cost successfully updated!");
            setRideCostDetails(res.data);
        } catch (err) {
            console.error(err);
            setErrMsg(err.response?.data?.message || "Failed to update ride cost details");
            alert(err.response?.data?.message || "Failed to update ride cost details");
        }
    };

    return (
        <section className="update_ride">
            <div className="ride_info">
                <h3>Update Ride Cost Details from <span>{rideCostDetails?.from_location}</span> to <span>{rideCostDetails?.to_location}</span></h3>
            </div>

            {rideCostDetails ? (
                <div className="update_ride_form_container">
                    <form className="update_ride_form" onSubmit={handleUpdate}>
                        <div className="input_group">
                            <label>Oneway Cost</label>
                            <input
                                type="number"
                                name="oneway_cost"
                                value={updateRideCost.oneway_cost}
                                onChange={handleInputs}
                            />
                        </div>

                        <div className="input_group">
                            <label>Return Cost</label>
                            <input
                                type="number"
                                name="return_cost"
                                value={updateRideCost.return_cost}
                                onChange={handleInputs}
                            />
                        </div>

                        <div className="input_group">
                            <label>Tax Rate</label>
                            <input
                                type="number"
                                step="0.1"
                                name="tax_rate"
                                value={updateRideCost.tax_rate}
                                onChange={handleInputs}
                            />
                        </div>

                        <div className="button_container">
                            <button type="submit">Update Ride Cost</button>
                        </div>
                    </form>
                </div>
            ) : (
                <p className="err_msg">{errMsg}</p>
            )}
        </section>
    );
};

export default UpdateRideCost;
