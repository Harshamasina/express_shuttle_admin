import { useState } from 'react';
import axios from 'axios';
import { auth } from '../../Config/Firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";

const Register = () => {
    const [adminRegister, setAdminRegister] = useState({
        name: "",
        dob: "",
        email: "",
        phone: "",
        designation: "",
        employee_id: "",
        password: "",
        cpassword: "",
        address: ""
    });

    const [ errorMsg, setErrorMsg ] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setAdminRegister({ ...adminRegister, [name]: value });
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        try {
            if (!validatePassword(adminRegister.password)) {
                setErrorMsg("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.");
                return;
            }
    
            if (adminRegister.password !== adminRegister.cpassword) {
                setErrorMsg("Passwords do not match.");
                return;
            }
            
            const userCredential = await createUserWithEmailAndPassword(auth, adminRegister.email, adminRegister.password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: adminRegister.name
            });

            await sendEmailVerification(user);
            setSuccessMsg(`A verification email has been sent to ${adminRegister.email}. Please verify your email to continue.`);

            const checkEmailVerification = setInterval(async () => {
                await user.reload();
                if (user.emailVerified) {
                    clearInterval(checkEmailVerification);
                    const adminData = {
                        name: adminRegister.name,
                        dob: adminRegister.dob,
                        email: adminRegister.email,
                        password: adminRegister.password,
                        phone: adminRegister.phone,
                        address: adminRegister.address,
                        designation: adminRegister.designation,
                        employee_id: adminRegister.employee_id,
                        firebase_uid: user.uid,
                    };
                    try {
                        await axios.post(`${import.meta.env.VITE_LOCAL_API_URL}/api/admins`, adminData);
                        setSuccessMsg("Admin account has been successfully created!");
                    } catch (apiError) {
                        setErrorMsg(apiError.response?.data?.error || "Failed to store user details. Please try again.");
                        return;
                    }
                    setAdminRegister({
                        name: "",
                        dob: "",
                        email: "",
                        phone: "",
                        designation: "",
                        employee_id: "",
                        password: "",
                        cpassword: "",
                        address: ""
                    });
                }
            }, 3000);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
    
            switch (errorCode) {
                case "auth/email-already-in-use":
                    setErrorMsg("The email address is already in use by another account.");
                    break;
                case "auth/invalid-email":
                    setErrorMsg("The email address is not valid.");
                    break;
                case "auth/weak-password":
                    setErrorMsg("The password is too weak.");
                    break;
                default:
                    setErrorMsg(errorMessage || "Something went wrong. Please try again.");
            }
        }
    };

    console.log(adminRegister);
    return (
        <div className="form_container">
            <h3>Create an Admin Account</h3>
            <form onSubmit={handleSubmit} className="user_form">
                <label>Name</label>
                <input type="text" placeholder="Enter your Name" name='name' value={adminRegister.name} onChange={handleInputs} required />

                <label>Date of Birth</label>
                <input type="date" placeholder="Enter your Date of Birth" name='dob' value={adminRegister.dob} onChange={handleInputs} required />

                <label>Email</label>
                <input type="email" placeholder="Enter your Email" name='email' value={adminRegister.email} onChange={handleInputs} required />

                <label>Phone</label>
                <input type="tel" placeholder="Enter your Phone Number" name='phone' value={adminRegister.phone} onChange={handleInputs} required />

                <label>Designation</label>
                <input type="text" placeholder="Enter your Designation" name='designation' value={adminRegister.designation} onChange={handleInputs} required />

                <label>Emloyee Id</label>
                <input type="text" placeholder="Enter your Employee Id" name='employee_id' value={adminRegister.employee_id} onChange={handleInputs} required />

                <label>Password</label>
                <input type="password" placeholder="Enter your Password" name='password' value={adminRegister.password} onChange={handleInputs} required />

                <label>Confirm Password</label>
                <input type="password" placeholder="Confirm your Password" name='cpassword' value={adminRegister.cpassword} onChange={handleInputs} required />

                <label>Address</label>
                <input type="text" placeholder="Enter your Address" name='address' value={adminRegister.address} onChange={handleInputs} required />
                
                <button type='submit' className="signup-btn">Register Admin Account</button>
            </form>
            {errorMsg && <p className="text-danger mt-3">{errorMsg}</p>}
            {successMsg && <p className="text-success mt-3">{successMsg}</p>}
        </div>
    )
};

export default Register;