import CurrentRevenue from "./CurrentRevenue";
import CustomRevenue from "./CustomRevenue";
import FetchMonthRevenue from "./FetchMonthRevenue";

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