import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import image from "../images/login.png";
import signuptop from "../images/login-top.png";
import { MdEmail } from "react-icons/md";
import { AiFillEyeInvisible, AiFillEye, AiOutlineUser } from "react-icons/ai";
import { BsFillLockFill, BsTelephoneFill } from "react-icons/bs";
import Allergy from "../images/allergy-preferance.png";
import PhoneIcon from "../images/phone.png";
import UserIcon from "../images/user.png";
import { useDispatch, useSelector } from "react-redux";
import { register } from '../action/userAction'



const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister)

    const [allValues, setAllValues] = useState({ full_name: '', email: '', phone: '', password: '', allergy: '' })
    const [passwordType, setPasswordType] = useState("password");

    const onChangeHandler = (e) => {
        setAllValues({ ...allValues, [e.target.name]: e.target.value })
    }


    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }


    const OnSubmitHandler = (e) => {
        e.preventDefault();
        localStorage.setItem('full_name', JSON.stringify(allValues.full_name))
        localStorage.setItem('email', JSON.stringify(allValues.email))
        localStorage.setItem('phone', JSON.stringify(allValues.phone))
        localStorage.setItem('password', JSON.stringify(allValues.password))
        localStorage.setItem('allergy', JSON.stringify(allValues.allergy))

        // dispatch(register(allValues.full_name, allValues.email, allValues.phone, allValues.password, allValues.allergy))

        navigate("/signup/card");
    };
    return (
        <div className="signup_screen">
            <img src={signuptop} alt="signuptop" className="signup_top w-100 img-fluid mt-1" />
            <div className="form_sign_div d-grid align-items-center justify-content-center">
                <img src={image} alt="signup_img" className="signup_img mx-5 px-5 mt-0" />
                <Container>
                    <Form className="signup_form mt-4 pt-1 border-2 border-bottom" onSubmit={OnSubmitHandler}>
                        <Form.Group className="mb-3 position-relative" controlId="formBasicName">
                            <AiOutlineUser className="user_icon position-absolute my-2 mx-4" />
                            <Form.Control
                                type="text"
                                value={allValues.full_name}
                                name='full_name'
                                onChange={onChangeHandler}
                                placeholder="Full name"
                                className="px-5 py-2 border-2 ms-2"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 position-relative" controlId="formBasicLanguage">
                            <MdEmail className="mail_icon position-absolute my-2 mx-4" />
                            <Form.Control
                                type="email"
                                value={allValues.email}
                                name='email'
                                onChange={onChangeHandler}
                                placeholder="Email Address"
                                className="px-5 py-2 border-2 ms-2"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 position-relative" controlId="formBasicPhone">
                            <BsTelephoneFill className="phone_icon position-absolute my-2 mx-4" />
                            <Form.Control
                                type="number"
                                value={allValues.phone}
                                name='phone'
                                onChange={onChangeHandler}
                                placeholder="Phone"
                                className="px-5 py-2 border-2 ms-2"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
                            <BsFillLockFill className="pass_icon position-absolute my-2 mx-4" />
                            <div onClick={togglePassword}>
                                {passwordType === "password" ?
                                    <AiFillEyeInvisible className="eye_icon position-absolute end-0 mt-2 mb-2 mx-4 text-center" />
                                    : <AiFillEye className="eye_icon position-absolute end-0 mt-2 mb-2 mx-4 text-center" />
                                }
                            </div>
                            <Form.Control
                                type={passwordType}
                                value={allValues.password}
                                name='password'
                                onChange={onChangeHandler}
                                placeholder="Password"
                                className="px-5 py-2 border-2 ms-2"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 position-relative" controlId="FormControlTextarea1">
                            <img src={Allergy}
                                alt="allergypreference"
                                className="allergy_icon position-absolute my-2 mx-4" />
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={allValues.allergy}
                                name='allergy'
                                onChange={onChangeHandler}
                                placeholder="Alllergy/preference"
                                className="px-5 py-2 border-2 ms-2"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 d-grid align-items-center justify-content-center">
                            <Button
                                variant="primary"
                                type="submit"
                                className="login_btn px-5 py-3 text-uppercase fw-bolder border-0"
                            >
                                Next
                            </Button>
                        </Form.Group>
                    </Form>
                </Container>
                <div className="d-grid align-items-center justify-content-center">
                    <p className="pt-2 pt-xl-2 mb-0" style={{ fontSize: "14px" }}>
                        Already have an account?
                        <Link to="/login" className="text-decoration-none ps-1 ps-xl-1 fw-bold">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
