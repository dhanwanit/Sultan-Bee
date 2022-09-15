import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import "./user.css";
import userImage from "../../../images/images.jpeg";
import { Publish } from "@material-ui/icons";
import swal from 'sweetalert';
import Sidebar from '../../Sidebar/Sidebar'



const User = () => {
    const [full_name, setUpdatedName] = useState();
    const [email, setUpdatedEmail] = useState();
    const [phone, setUpdatedPhone] = useState();
    const [allergy, setUpdatedAllergy] = useState();

    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getUserDetail();
    }, []);


    const getUserDetail = async () => {
        let result = await fetch(`http://192.168.1.30:8080/api/admin/get_single_user/${userId}`);
        result = await result.json();
        // console.log("result", result);
        setUpdatedName(result[0].full_name);
        setUpdatedEmail(result[0].email);
        setUpdatedPhone(result[0].phone);
        setUpdatedAllergy(result[0].allergy)
    };

    const updateUserDetail = async (event) => {
        event.preventDefault();
        // console.log(full_name);
        // console.log(email);
        // console.log(phone);
        // console.log(allergy);

        let result = await fetch(`http://192.168.1.30:8080/api/admin/update/${userId}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ full_name, email, phone, allergy })
        });
        swal({ title: "User Successfully Updated!", icon: "success" });
        setUpdatedName('');
        setUpdatedEmail('');
        setUpdatedEmail('');
        setUpdatedPhone('');
        setUpdatedAllergy('');
        navigate('/users');
    }


    return (
        <>
            <Sidebar />
            <div className="user p-3">
                <div className="userTitleContainer d-flex align-items-center justify-content-between mb-3">
                    <h1 className="userTitle fw-bold">Edit User</h1>
                </div>

                <div className="userContainer d-flex">

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
        </>
    );
};

export default User;
