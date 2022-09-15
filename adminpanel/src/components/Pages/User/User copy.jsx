import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./user.css";
import userImage from "../../../images/images.jpeg";
import {
    MailOutline,
    PhoneAndroid,
    Payment,
    Schedule,
    Publish
} from "@material-ui/icons";
import AllergyIcon from "../../../images/allergy_icon.svg";
import CvvIcon from "../../../images/card-cvv.svg";

const User = () => {
    const [full_name, setUpdatedName] = useState();
    const [email, setUpdatedEmail] = useState();
    const [phone, setUpdatedPhone] = useState();
    const [allergy, setUpdatedAllergy] = useState();

    const [cardDetails, setCardDetails] = useState({
        cardNo: "",
        expiry: "",
        cvv: "",
    });
    const [userDetail, setUserDetail] = useState({
        fullname: '',
        userEmail: '',
        contact: '',
        foodAllergy: ''
    })

    const { userId } = useParams();

    useEffect(() => {
        getUserDetail();
    }, []);


    const getUserDetail = async () => {
        let result = await fetch(`http://localhost:8080/api/admin/get_single_user/${userId}`);
        result = await result.json();
        // console.log("result", result);
        setUpdatedName(result[0].full_name);
        setUpdatedEmail(result[0].email);
        setUpdatedPhone(result[0].phone);
        setUpdatedAllergy(result[0].allergy)

        setCardDetails({
            cardNo: result[0].card_no,
            expiry: result[0].expire_date,
            cvv: result[0].cvv,
        });
        setUserDetail({
            fullname: result[0].full_name,
            userEmail: result[0].email,
            contact: result[0].phone,
            foodAllergy: result[0].allergy
        });
    };

    const updateUserDetail = async (event) => {
        event.preventDefault();
        console.log(full_name);
        console.log(email);
        console.log(phone);
        console.log(allergy);

        let result = await fetch(`http://localhost:8080/api/admin/update/${userId}`, {
            method: 'put',
            body: JSON.stringify({ full_name, email, phone, allergy })
        });
        result = await result.json();
        console.log(result);
    }




    return (
        <div className="user p-3">
            <div className="userTitleContainer d-flex align-items-center justify-content-between mb-3">
                <h1 className="userTitle fw-bold">Edit User</h1>
            </div>

            <div className="userContainer d-flex">

                <div className="userShow">
                    <div className="userShowTop d-flex align-items-center">
                        <img src={userImage} alt="userImage" className="userShowImage" />
                        <div className="userShowTopTitle d-flex flex-column ms-3">
                            <span className="userShowUserName">{userDetail.fullname}</span>
                        </div>
                    </div>

                    <div className="userShowBottom mt-3">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo d-flex align-items-center">
                            <Payment className="userShowIcon" />
                            <span className="userShowInfoTitle ms-2">
                                {cardDetails.cardNo}
                            </span>
                        </div>
                        <div className="userShowInfo d-flex align-items-center">
                            <Schedule className="userShowIcon" />
                            <span className="userShowInfoTitle ms-2">
                                {cardDetails.expiry}
                            </span>
                        </div>
                        <div className="userShowInfo d-flex align-items-center">
                            <img src={CvvIcon} alt="cvv" className="userShowCvv" />
                            <span className="userShowInfoTitle ms-2">{cardDetails.cvv}</span>
                        </div>

                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo d-flex align-items-center">
                            <MailOutline className="userShowIcon" />
                            <span className="userShowInfoTitle ms-2">{userDetail.userEmail}</span>
                        </div>
                        <div className="userShowInfo d-flex align-items-center">
                            <PhoneAndroid className="userShowIcon" />
                            <span className="userShowInfoTitle ms-2">{userDetail.contact}</span>
                        </div>

                        <span className="userShowTitle">Allergy Preference</span>
                        <div className="userShowInfo d-flex align-items-center">
                            <img
                                src={AllergyIcon}
                                alt="allergy"
                                className="userShowAllergy"
                            />
                            <span className="userShowInfoTitle ms-2">{userDetail.foodAllergy}</span>
                        </div>
                    </div>
                </div>

                <div className="userUpdate ms-3">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm d-flex justify-content-between mt-3" onSubmit={updateUserDetail}>

                        <div className="userUpdateLeft">
                            <div className="userUpdateItem d-flex flex-column mt-3">
                                <label>Username</label>
                                <input
                                    type="text"
                                    placeholder="User Name"
                                    value={full_name}
                                    onChange={(e) => setUpdatedName(e.target.value)}
                                    className="userUpdateInput" />
                            </div>
                            <div className="userUpdateItem d-flex flex-column mt-3">
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="annabecker@gmail.com"
                                    value={email}
                                    onChange={(e) => setUpdatedEmail(e.target.value)}
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem d-flex flex-column mt-3">
                                <label>Phone</label>
                                <input
                                    type="number"
                                    placeholder="8871745112"
                                    value={phone}
                                    onChange={(e) => setUpdatedPhone(e.target.value)}
                                    className="userUpdateInput" />
                            </div>
                            <div className="userUpdateItem d-flex flex-column mt-3">
                                <label>Allergy</label>
                                <input
                                    type="text"
                                    placeholder="mushroom"
                                    value={allergy}
                                    onChange={(e) => setUpdatedAllergy(e.target.value)}
                                    className="userUpdateInput" />
                            </div>
                        </div>

                        <div className="userUpdateRight d-flex flex-column justify-content-between">
                            <div className="userUpdateUpload d-flex align-items-center">
                                <img src={userImage} alt="user" className="userUpdateImg me-3" />
                                <label htmlFor="file"><Publish className="userUpdateIcon" /></label>
                                <input type="file" id="file" style={{ display: 'none' }} />
                            </div>
                            <button className="userUpdateButton">Update</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default User;
