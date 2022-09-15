import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import image from "../images/login.png";
import logintop from "../images/login-top.png";
import fb from "../images/fb-icon.png";
import tw from "../images/twitter-icon.png";
import { MdEmail } from "react-icons/md";
import { BsFillLockFill } from "react-icons/bs";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../action/userAction";
// import Message from '../component/shared/message'
// import Loader from '../component/shared/loader'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin;
    // console.log(userInfo.Active);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordType, setPasswordType] = useState("password");
    const [isLogin, setIsLogin] = useState(false);


    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
       
        // if (email == userInfo.email && userInfo.password == password) {
        //     alert("You're Successfully logged in!")
        //     navigate('/hotel')
        // } else if (userInfo.Active == false) {
        //     alert("User is Disabled")
        //     navigate('/login')
        // } else {
        //     alert("Invalid email & password")
        // }
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        else {
           navigate('/hotel');
        }
    }, [userInfo])


    const responseFacebook = (response) => {
        console.log(response);

        if (response.status === "unknown") {
            alert("Login failed!");
            setIsLogin(false);
            return false;
        }

        if (response.accessToken) {
            setIsLogin(true);
            localStorage.setItem('userInfo', JSON.stringify(response));
            navigate('/hotelcc');
        } else {
            setIsLogin(false);
        }
    }

    return (
        <div className="login_screen">
            <img src={logintop} alt="logintop" className="login_top w-100 img-fluid mt-3" />
            <div className="form_div d-grid align-items-center justify-content-center">
                <img src={image} alt="login_img" className="login_img mx-5 px-5 mt-0" />
                <Container>
                    {/* {error && <Message variant='danger'>{error}</Message>}
                 {loading && <Loader />} */}
                    <Form className="mt-4 pt-1 border-2 border-bottom" onSubmit={submitHandler}>
                        <Form.Group className="mb-3 position-relative" controlId="formBasicEmail">
                            <MdEmail className="mail_icon position-absolute my-3 mx-4" />
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                placeholder="Email address"
                                className="px-5 py-3 border-2 ms-2"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4 position-relative" controlId="formBasicPassword">
                            <BsFillLockFill className="pass_icon position-absolute my-3 mx-4" />
                            <div onClick={togglePassword}>
                                {passwordType === "password" ? <AiFillEyeInvisible className="eye_icon position-absolute end-0 mt-3 mb-2 mx-4 text-center" />
                                    : <AiFillEye className="eye_icon position-absolute end-0 mt-3 mb-2 mx-4 text-center" />
                                }
                            </div>


                            <Form.Control
                                type={passwordType}
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                placeholder="Password"
                                className="px-5 py-3 border-2 ms-2"
                                required
                            />

                        </Form.Group>
                        <Form.Group className="mb-3 d-grid align-items-center justify-content-center">
                            <Button
                                variant="primary"
                                type="submit"
                                className="login_btn px-5 py-3 text-uppercase fw-bolder border-0"
                            >
                                Login
                            </Button>
                        </Form.Group>

                        <Form.Group
                            className="forgot_password pb-4 d-grid align-items-center justify-content-center"
                            controlId="formBasicForgotPassword"
                        >
                            <Link to="#" className="text-decoration-none">Forgot Password?</Link>
                        </Form.Group>
                    </Form>
                </Container>

                <div className="footer_icon d-flex align-items-center justify-content-center mx-5 px-5 pt-3 pt-xl-2">

                    <FacebookLogin
                        appId="541473214176395"
                        autoLoad={false}
                        fields="name,picture,birthday,email,gender"
                        scope="public_profile,user_birthday,email,user_gender"
                        callback={responseFacebook}
                        render={renderProps => (
                            <img src={fb}
                                alt="fb_icon"
                                onClick={renderProps.onClick}
                                className="ps-2 ps-xl-3 img-fluid"
                            />
                        )}
                    />
                    {/* <img src={fb} alt="fb_icon" className="ps-2 ps-xl-3 img-fluid" /> */}
                    <img src={tw} alt="tw_icon" className="ps-3 ps-xl-3 img-fluid" />
                </div>
                <div className="create_accnt d-grid align-items-center justify-content-center">
                    <Link to="/signup" className="pt-1 pt-xl-0 text-decoration-none text-dark ps-xl-3 fw-bold">
                        Create New Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
