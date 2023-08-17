

import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import "./navbar.css"

export default function Navbar() {
    const { user } = useContext(AuthContext);    
    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                    <span className="logo">Home</span>
                </Link>
                <div className="navItems">
                    {user.isAdmin ? (
                        <button className="navButton">
                            <Link to="/users" style={{ color: "inherit", textDecoration: "none" }}>
                                <span className="logo">Users</span>
                            </Link>
                        </button>
                    ) : ""}
                     <button className="navButton">
                            <Link to="/userprofile" style={{ color: "inherit", textDecoration: "none" }}>
                                <span className="logo">User Profile</span>
                            </Link>
                        </button>
                </div>
            </div>
        </div>
    );
}