import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./topbar.css";
import { NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

const Topbar = () => {
    const auth = localStorage.getItem("admin");
    const authenticate = JSON.parse(auth);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="topbar w-100 position-sticky top-0">
            <div className="topbarWrapper h-100 py-0 px-4 d-flex align-items-center justify-content-between">
                <div className="topLeft">
                    <LinkContainer to="/">
                        <span className="logo">
                            <span style={{ color: "#401c04" }}>Sultan</span>
                            <span style={{ color: "#ffbc00" }}>bee</span> Admin
                        </span>
                    </LinkContainer>
                </div>
                {auth ? (
                    <div className="topRight d-flex align-items-center">
                        {/*  <div className="topbarIconContainer position-relative me-2">
                            <NotificationsNone />
                        </div>
                        <div className="topbarIconContainer position-relative me-2">
                            <Language />
                        </div>
                        <div className="topbarIconContainer position-relative me-2">
                            <Settings />
                </div> */}
                        <LinkContainer to="/">
                            <NavDropdown
                                title={
                                    <img src={authenticate.admin_images}
                                        alt="avatar"
                                        className="topAvatar"
                                    />
                                }
                                id="basic-nav-dropdown"
                            >

                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>
                                        Profile
                                    </NavDropdown.Item>
                                </LinkContainer>

                                <NavDropdown.Item
                                    onClick={logout}>
                                    {/* Logout ({JSON.parse(auth).admin_name}) */}
                                    Logout ({authenticate.admin_name})
                                </NavDropdown.Item>
                            </NavDropdown>
                        </LinkContainer>
                    </div>
                ) : (
                    <ul className="nav-ul nav-right">
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Topbar;
