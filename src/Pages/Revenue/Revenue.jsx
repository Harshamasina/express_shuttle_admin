import CurrentRevenue from "../../Components/CurrentRevenue";
import CustomRevenue from "../../Components/CustomRevenue";
import FetchMonthRevenue from "../../Components/FetchMonthRevenue";

const Revenue = () => {
    return (
        <div>
            <CurrentRevenue />
            <FetchMonthRevenue />
            <CustomRevenue />
        </div>
    )
};

export default Revenue;