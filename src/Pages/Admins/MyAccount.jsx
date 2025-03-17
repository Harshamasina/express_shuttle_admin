import SignoutButton from "../../Components/SignoutButton";
import { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { AuthContext } from '../../Context/AuthContext';
import { MutatingDots } from "react-loader-spinner";

const MyAccount = () => {
    const [loading, setLoading] = useState(true);
    const [account, setAccount] = useState(null);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const searchParam = currentUser?.phoneNumber ? currentUser.phoneNumber : currentUser?.uid;
                const res = await axios.get(`${import.meta.env.VITE_LOCAL_API_URL}/api/fetch_admin_acc/${searchParam}`);
                setLoading(false);
                setAccount(res.data);
            } catch (error) {
                console.error(error);
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
            <h2>Admin Details for {account[0]?.name}</h2>

            <div className='account_container'>
                <div className='main-body'>
                    <div className="row gutters-sm">
                        <div className="col-md-8">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Full Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <p>{account[0]?.name}</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Date of Birth</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <p>{moment(account[0]?.dob).format('YYYY-MM-DD')}</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Employee Id</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <p>{account[0]?.employee_id}</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Phone</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <p>{account[0]?.phone}</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <p>{account[0]?.email}</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Designation</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <p>{account[0]?.designation}</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Address</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <p>{account[0]?.address}</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SignoutButton />
        </section>
    )
};

export default MyAccount;