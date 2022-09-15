import { KeyboardArrowLeftOutlined, MoreVert, Mail, LocalPhoneTwoTone, Publish } from '@mui/icons-material'
// import { Button, IconButton, Input } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import ProfilePic from '../../images/images.jpeg'
import { getUserDetails, updateUserProfile } from "../../action/userAction"
import allergyIcon from '../../images/allergy-preferance.png'
import "./profile.css";


const Profile = () => {
  const [show, setShow] = useState(true)
  const userDetail = useSelector((state) => state.userDetail)
  const { user } = userDetail;
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;
  const userUpdate = useSelector((state) => state.userUpdate)
  const { success } = userUpdate;

  const [full_name, setFull_name] = useState(userInfo.full_name)
  const [email, setEmail] = useState(userInfo.email)
  const [phone, setPhone] = useState(userInfo.phone)
  const [allergy, setAllergy] = useState(userInfo.allergy)

  const navigate = useNavigate();
  const dispatch = useDispatch();


  // console.log("get user Details", user.full_name);
  // console.log(user);
  // console.log("success", success);
  // console.log(userInfo);
  // console.log(userInfo._id);

  const changeDetails = () => {
    setShow(false)
  }

  const orderScreen = () => {
    navigate('/history')
  }

  const submitHandler = (e,id) => {
    e.preventDefault();
    dispatch(updateUserProfile({ id, full_name, email, phone, allergy }));
  }


  useEffect(() => {
    if (!userInfo) {
      navigate("/login")
    } else {
      dispatch(getUserDetails())
    }
  }, [navigate, userInfo, dispatch])




  return (
    <div className='profileMain'>
      <div className="profileHeader">

        <div className="profileIcon">
          <div className="hotelarrow d-flex align-items-center justify-content-between">
            <KeyboardArrowLeftOutlined onClick={() => navigate(-1)} />
            <p>Profile</p>
            <MoreVert />
          </div>
        </div>

        <div className='userDetails'>
          <div className='userDetailsContent'>
            <div className="circle ">
              <img src={ProfilePic} alt="unplash" className='w-100  ' />
            </div>

            <div className="userBio text-center mt-3">
              <Row>
                <Col className="userName">{userInfo.full_name}</Col>
              </Row>
              <Row style={{ marginTop: "20px", fontSize: "18px" }}>
                <Col><Mail className='emailIcon' />{userInfo.email}</Col>
              </Row>
              <Row style={{ fontSize: "18px" }}>
                <Col><img src={allergyIcon} alt="allergy" className="allergyIcon" />{userInfo.allergy}</Col>
              </Row>
              <Row style={{ fontSize: "18px" }}>
                <Col><LocalPhoneTwoTone className='phoneIcon' />{userInfo.phone}</Col>
              </Row>
            </div>
          </div>
          <hr />
          <div className="userButton">
            <Row className='text-center'>
              <Col>
                <button onClick={orderScreen} className='orderButton'>My Orders</button>
              </Col>
            </Row>
            <Row className='text-center'>
              {show ? (
                <Col>
                  <button onClick={(e) => changeDetails(e)} className='updateButton'>Update Profile</button>
                </Col>)
                : (
                  <div className="user p-4">
                    <div className="userContainer d-flex">
                      <div className="userUpdate mx-1">
                        <span className="userUpdateTitle">Edit</span>

                        <form className="userUpdateForm mt-3" onSubmit={e=>submitHandler(e,userInfo._id)}>

                          <div className="userUpdateUpload">
                            <img src={ProfilePic} alt="user" className="userUpdateImg me-2 ms-4" />
                            <label htmlFor="file"><Publish className="userUpdateIcon" /></label>
                            <input type="file" id="file" style={{ display: 'none' }} />
                          </div>

                          <div className="userUpdateLeft">
                            <div className="userUpdateItem d-flex flex-column mt-3">
                              <label>Username</label>
                              <input
                                type="text"
                                placeholder="User Name"
                                value={full_name}
                                onChange={(e) => setFull_name(e.target.value)}
                                className="userUpdateInput" />
                            </div>
                            <div className="userUpdateItem d-flex flex-column mt-3">
                              <label>Email</label>
                              <input
                                type="email"
                                placeholder="Enter Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="userUpdateInput"
                              />
                            </div>
                            <div className="userUpdateItem d-flex flex-column mt-3">
                              <label>Phone</label>
                              <input
                                type="number"
                                placeholder="Enter Mobile Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="userUpdateInput" />
                            </div>
                            <div className="userUpdateItem d-flex flex-column mt-3">
                              <label>Allergy</label>
                              <input
                                type="text"
                                placeholder="Edit Allergy "
                                value={allergy}
                                onChange={(e) => setAllergy(e.target.value)}
                                className="userUpdateInput" />
                            </div>
                          </div>

                          <div className="userUpdateRight">
                            <button className="userUpdateButton">Update</button>
                          </div>

                        </form>
                      </div>
                    </div>
                  </div>)
              }
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile