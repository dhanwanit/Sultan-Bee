import React, { useEffect, useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap';
import PaymentImgSlider from './PaymentImgSlider';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { register } from "../action/userAction";

const PayCard = () => {
    const now = new Date;
    const until = new Date(now.getFullYear() + 10, now.getMonth());
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister;
    const full_name = JSON.parse(localStorage.getItem('full_name'))
    const email = JSON.parse(localStorage.getItem('email'))
    const phone = JSON.parse(localStorage.getItem('phone'))
    const password = JSON.parse(localStorage.getItem('password'))
    const allergy = JSON.parse(localStorage.getItem('allergy'))

    const [user, setUser] = useState({ name_on_card: '', card_no: '', expire_date: '', cvv: '', full_name, email, phone, password, allergy })

    const onChangeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }


    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(register(full_name, email, phone, password, allergy, user.name_on_card, user.card_no, user.expire_date, user.cvv));
    }


    useEffect(() => {
        if (userInfo) {
            navigate("/login");
        }
    }, [navigate, userInfo])


    const formatString = (event) => {
        var inputChar = String.fromCharCode(event.keyCode);
        var code = event.keyCode;
        var allowedKeys = [8];
        if (allowedKeys.indexOf(code) !== -1) {
            return;
        }

        event.target.value = event.target.value.replace(
            /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
        ).replace(
            /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
        ).replace(
            /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
        ).replace(
            /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
        ).replace(
            /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
        ).replace(
            /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
        ).replace(
            /\/\//g, '/' // Prevent entering more than 1 `/`
        );
    }


    return (
        <>
            <div className="card_details">
                <Container>
                    <PaymentImgSlider />
                    <p className='detail fs-6 fw-bold ms-4 ms-xl-0'>
                        Card Details
                    </p>
                    <Form className="Signnext_form mx-3 mx-xl-5 pt-2 px-xl-5" onSubmit={onSubmitHandler}>

                        <Form.Group className="mb-3 position-relative" controlId="formBasicNameCard">
                            <p className='demo_name position-absolute end-0 my-2 mx-3 fw-bold pt-1'>David Smith</p>
                            <Form.Control
                                type="text"
                                placeholder="Name On Card"
                                name="name_on_card"
                                value={user.name_on_card}
                                onChange={onChangeHandler}
                                className="m-0 mx-xl-5 py-2 px-4"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 position-relative" controlId="formBasicCardNumber">
                            <p className="demo_number position-absolute end-0 my-2 mx-3 fw-bold pt-1">**** **** **** 5443</p>
                            <Form.Control
                                type="number"
                                placeholder="Card Number"
                                className="m-0 mx-xl-5 py-2 px-4"
                                name="card_no"
                                value={user.card_no}
                                onChange={(event) => {
                                    if (event.target.value.length == 17)  //limits to 16 digit entry
                                        return false;
                                    setUser({ card_no: event.target.value }) //saving input to state
                                    onChangeHandler(event);
                                }}
                                required
                            />
                        </Form.Group>

                        <div className='pay_div d-flex'>
                            <Form.Group className="mb-3 me-3 position-relative" controlId="formBasicExpire">
                                <p className='demo_expiry position-absolute end-0 my-2 mx-3 fw-bold pt-1'>10/2020</p>
                                <Form.Control
                                    // type="date"
                                    type="text"
                                    placeholder="Expiry"
                                    name="expire_date"
                                    value={user.expire_date}
                                    onKeyUp={formatString}
                                    onChange={(event) => {
                                        if (event.target.value.length == 8) return false;
                                        setUser({ expire_date: event.target.value })
                                        onChangeHandler(event);
                                    }}
                                    className="m-0 mx-xl-5 py-2 px-4 px-xl-5"
                                    required
                                />
                                {/*   <Datepicker
                                    dateFormat="MM/YYYY"
                                    dateWheels="mm - MMMM  YYY"
                                    min={now}
                                    max={until}
                                    value="12/2025"
                                    label="Expiration"
                                    placeholder="Required"
                                    touchUi={true}
                        /> */}
                            </Form.Group>

                            <Form.Group className="mb-3 position-relative" controlId="formBasicCvv">
                                <p className='demo_cvv position-absolute end-0 my-0 mx-3 fw-bold'>...</p>
                                <Form.Control
                                    type="number"
                                    placeholder="CVV"
                                    name="cvv"
                                    className="m-0 mx-xl-5 py-2 px-4 px-xl-5"
                                    value={user.cvv}
                                    onChange={(event) => {
                                        if (event.target.value.length == 4) return false;
                                        setUser({ cvv: event.target.value });
                                        onChangeHandler(event);
                                    }}
                                    required
                                />
                            </Form.Group>
                        </div>
                        <Form.Group className="mb-3 d-grid align-items-center justify-content-center">
                            <Button variant="primary"
                                type="submit"
                                className='signup_btn px-5 py-3 mt-2 text-uppercase fw-bolder border-0'
                            >
                                Sign Up
                            </Button>
                        </Form.Group>
                    </Form>
                </Container>
            </div>
        </>
    )
}

export default PayCard