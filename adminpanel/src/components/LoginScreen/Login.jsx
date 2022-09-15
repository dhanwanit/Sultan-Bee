import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import './login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [passwordType, setPasswordType] = useState("password");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('admin');
        if (auth) {
            navigate('/')
        }
    })

    // const togglePassword = () => {
    //     if (passwordType === "password") {
    //         setPasswordType("text")
    //         return;
    //     }
    //     setPasswordType("password")
    // }

    const loginHandler = async (e) => {
        e.preventDefault();
        let result = await fetch('http://192.168.1.30:8080/api/admin/login', {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        result = await result.json();
        // console.log(result);
        localStorage.setItem("admin", JSON.stringify(result));
        navigate('/');
    }
    return (
        <div className='adminLogin ms-4 mt-4'>
            <div className='adminLoginHeader d-flex justify-content-center align-items-center'>
                <h1 className='adminLoginTitle'>Login</h1>
                {/*  <span style={{ color: "#00008b" }}>Admin </span>
                    <span style={{ color: "#401c04" }}>Log-</span>
    <span style={{ color: "#ffbc00" }}>In</span> */}

            </div>
            <Form onSubmit={loginHandler} className='adminLoginForm'>
                <Form.Group className="mb-3 m-auto position-relative adminLoginItem" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3 m-auto postion-relative adminLoginItem" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="m-auto adminLoginItem">
                    <Button variant="primary" type="submit" className="adminLoginButton">
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Login