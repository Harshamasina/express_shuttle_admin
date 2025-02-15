import React from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from "react-router-dom";
import { auth } from "../Config/Firebase";
import { signOut } from "firebase/auth";
import { useContext } from "react";

const SignoutButton = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        if(!currentUser){
            window.alert("No User is Currently Signed In");
        }

        const confirmed = window.confirm(`${currentUser.displayName || "User"}, Are you sure you want to sign out?`);
        if (!confirmed) return;

        try {
            await signOut(auth);
            window.alert("Signed Out Successfully");
            localStorage.removeItem("login");
            navigate("/");
        } catch (error) {
            console.error("Error signing out:", error);
            window.alert("Failed to sign out. Please try again.");
        }
    };
    return (
        <button onClick={handleSignOut} className='signout_button'>Sign Out</button>
    )
};

export default SignoutButton;