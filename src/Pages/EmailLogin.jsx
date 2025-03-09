import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Config/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const EmailLogin = () => {
    const [adminLogin, setAdminLogin] = useState({
        email: "",
        password: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setAdminLogin({ ...adminLogin, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        try{
            const userCredential = await signInWithEmailAndPassword(auth, adminLogin.email, adminLogin.password);
            const user = userCredential.user;

            if (user.emailVerified) {
                setSuccessMsg("Login successful! Redirecting...");
                navigate("/");
                window.location.reload();
            } else {
                setErrorMsg("Please verify your email before logging in.");
            }
        } catch (error) {
            const errorCode = error.code;
            console.log(errorCode);
            switch (errorCode) {
                case "auth/user-not-found":
                    setErrorMsg("No user found with this email. Please register.");
                    break;
                case "auth/wrong-password":
                    setErrorMsg("Incorrect password. Please try again.");
                    break;
                case "auth/invalid-email":
                    setErrorMsg("The email address is not valid.");
                    break;
                case "auth/too-many-requests":
                    setErrorMsg("Too many unsuccessful login attempts. Please try again later.");
                    break;
                default:
                    setErrorMsg("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <section className="login-section">
            <div className="login-container">
                <h2>Login with Email and Password</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <input type="email" name="email" value={adminLogin.email} onChange={handleInputs} placeholder="Enter your Mail" />
                    <input type={showPassword ? "text" : "password"} name="password" value={adminLogin.password} onChange={handleInputs}  placeholder="Enter your Password" />
                    <div className="show_pass">
                        <input type="checkbox" checked={showPassword} id="showPass" onChange={() => setShowPassword(!showPassword)} />
                        <label htmlFor="showPass">Show Password</label>
                    </div>

                    <button type='submit'>LogIn</button>
                    <Link className="login_email" to="/login">LogIn with Phone</Link>
                </form>

                {errorMsg && <p className="text-danger mt-3">{errorMsg}</p>}
                {successMsg && <p className="text-success mt-3">{successMsg}</p>}
            </div>
        </section>
    )
};

export default EmailLogin;