import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <section className="home_info">
            <span>Hello Paul Mcrath!</span>
            <h1>Welcome to Express Shuttle Admin</h1>
            {
                currentUser ? (
                    <Link to="/rides" className="home_link">Go To Rides</Link>
                ) : (<span>Login to Access the Web App</span>)
            }
        </section>
    )
};

export default Home;