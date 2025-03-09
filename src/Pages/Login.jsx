import React, { useState, useEffect } from "react";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../Config/Firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
                size: "normal",
                callback: () => console.log("reCAPTCHA Verified"),
                "expired-callback": () => setError("reCAPTCHA expired. Please refresh."),
            });

            window.recaptchaVerifier.render()
                .then((widgetId) => {
                    window.recaptchaWidgetId = widgetId;
                })
                .catch(err => console.error("reCAPTCHA render error:", err));
        }
    }, []);

    const handleSendOtp = async () => {
        setError("");

        if (!phone || !/^\+\d{10,15}$/.test(phone)) {
            setError("Enter a valid phone number with country code (e.g., +1234567890)");
            return;
        }

        try {
            setLoading(true);
            const appVerifier = window.recaptchaVerifier;
            const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
            setConfirmationResult(confirmation);
        } catch (err) {
            setError("Failed to send OTP. Check Firebase settings.");
            console.error("OTP Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setError("");
        if (!otp || otp.length !== 6) {
            setError("Enter a valid 6-digit OTP.");
            return;
        }
        try {
            setLoading(true);
            await confirmationResult.confirm(otp);
            alert("Login successful!");
            navigate("/");
        } catch (err) {
            setError("Invalid OTP. Please try again.");
            console.error("OTP Verification Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="login-section">
            <div className="login-container">
                <h2>Login</h2>
                <div className="login-form">
                    {!confirmationResult ? (
                        <>
                            <input
                                type="text"
                                placeholder="Enter phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <button onClick={handleSendOtp} disabled={loading}>
                                {loading ? "Sending OTP..." : "Send OTP"}
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <button onClick={handleVerifyOtp} disabled={loading}>
                                {loading ? "Verifying..." : "Verify OTP"}
                            </button>
                        </>
                    )}
                    {error && <p className="error-text">{error}</p>}
                </div>
                <div id="recaptcha-container" className="recaptcha"></div>
                
            </div>
        </section>
    );
};

export default Login;
