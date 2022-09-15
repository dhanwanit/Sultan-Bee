import React from "react";
import {
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,
    Storefront,
    AttachMoney,
    Restaurant,
    Category,
    MailOutline,
    ChatBubbleOutline,
    DynamicFeed,
    WorkOutline,
    Error,
    RestaurantMenu,
    Fastfood,
    Store,
    ListAlt,
} from "@material-ui/icons";
import "./sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar position-sticky">
            <div className="sidebarWrapper p-3">
                <div className="sidebarMenu mb-2">
                    <h3 className="sidebarTitle fw-bold">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/" className="sidebarListLink">
                            <li className="sidebarListItem active">
                                <LineStyle className="sidebarIcon" /> Home
                            </li>
                        </Link>
                        <Link to="/orders" className="sidebarListLink">
                            <li className="sidebarListItem">
                                <ListAlt className="sidebarIcon" /> Orders
                            </li>
                        </Link>
                        {/* <li className="sidebarListItem">
                            <TrendingUp className="sidebarIcon" /> Sales
                            </li> */}
                    </ul>
                </div>

                <div className="sidebarMenu mb-2">
                    <h3 className="sidebarTitle fw-bold">Quick Menu</h3>
                    <ul className="sidebarList">
                        <Link to="/users" className="sidebarListLink">
                            <li className="sidebarListItem">
                                <PermIdentity /> Users
                            </li>
                        </Link>
                        <Link to="/hotels" className="sidebarListLink">
                            <li className="sidebarListItem">
                                <Restaurant /> Restaurants
                            </li>
                        </Link>
                        <Link to="/menus" className="sidebarListLink">
                            <li className="sidebarListItem">
                                <RestaurantMenu /> Hotel Menus
                            </li>
                        </Link>
                        <Link to="/products" className="sidebarListLink">
                            <li className="sidebarListItem">
                                <Fastfood /> Products
                            </li>
                        </Link>
                       {/* <li className="sidebarListItem">
                            <AttachMoney /> Transactions
                        </li> */}
                    </ul>
                </div>

                <div className="sidebarMenu mb-2">
                    <h3 className="sidebarTitle fw-bold">Extras Quick Menu</h3>
                    <ul className="sidebarList">
                        <Link to="/extracategories" className="sidebarListLink">
                            <li className="sidebarListItem">
                                <Category /> Category
                            </li>
                        </Link>
                        <Link to="/extrafoods" className="sidebarListLink">
                            <li className="sidebarListItem">
                                <Fastfood /> Extras Products
                            </li>
                        </Link>
                    </ul>
                </div>

                <div className="sidebarMenu mb-2">
                    <h3 className="sidebarTitle fw-bold">Management</h3>
                    <ul className="sidebarList">
                        <Link to="/restaurant-management" className="sidebarListLink">
                            <li className="sidebarListItem">
                                <Store /> Restaurant Management
                            </li>
                        </Link>
                        <Link to="/product-management" className="sidebarListLink">
                            <li className="sidebarListItem">
                                <Storefront /> Product Management
                            </li>
                        </Link>
                        <Link to="/extras-management" className="sidebarListLink">
                            <li className="sidebarListItem">
                                <Storefront /> Extras Management
                            </li>
                        </Link>
                    </ul>
                </div>

                {/*<div className="sidebarMenu mb-2">
                    <h3 className="sidebarTitle fw-bold">Notifications</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <MailOutline /> Mail
                        </li>
                        <li className="sidebarListItem">
                            <DynamicFeed /> Feedback
                        </li>
                        <li className="sidebarListItem">
                            <ChatBubbleOutline /> Messages
                        </li>
                    </ul>
                </div>

                <div className="sidebarMenu mb-2">
                    <h3 className="sidebarTitle fw-bold">Staff</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <WorkOutline /> Manage
                        </li>
                        <li className="sidebarListItem">
                            <Timeline /> Analytics
                        </li>
                        <li className="sidebarListItem">
                            <Error /> Reports
                        </li>
                    </ul>
    </div> */}
            </div>
        </div>
    );
};

export default Sidebar;
