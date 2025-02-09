import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";

const FetchUsers = () => {
    const [userData, setUserData] = useState([]);
    const [errMsg, setErrMsg] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_LOCAL_API_URL}/api/fetch_all_users`);
                setUserData(res.data);
            } catch (err) {
                setUserData([]);
                console.error(err);
                setErrMsg(err.response?.data?.message || "Error fetching user details");
            }
        };
        fetchUserData();
    }, []);

    // Pagination Logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <div className="users_container">
            <h1 className="users_title">Users List</h1>

            {errMsg ? (
                <p className="error-message">{errMsg}</p>
            ) : (
                <>
                    <div className="table_container">
                        <table className="users_table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Date of Birth</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>User Type</th>
                                    <th>Firebase UID</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    currentUsers.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.name}</td>
                                            <td>{user.dob}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>
                                                {
                                                    user.user_type === 'S' ? "Student" : 
                                                    user.user_type === 'V' ? "Veteran" :
                                                    user.user_type === 'SC' ? "Senior Citizen" : "Other"
                                                }
                                            </td>
                                            <td>{user.firebase_uid}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="pagination_container">
                        <Pagination
                            count={Math.ceil(userData.length / usersPerPage)}
                            page={currentPage}
                            onChange={(event, value) => setCurrentPage(value)}
                            color="standard"
                            size="large"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default FetchUsers;
