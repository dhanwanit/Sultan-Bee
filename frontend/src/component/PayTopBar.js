import React from 'react';
import { Nav } from 'react-bootstrap';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';



const PayTopBar = () => {
    const navigate = useNavigate();
    return (
        <>
            <div>
                <div className='upper_nav'>
                    <IoIosArrowBack
                        className="fs-2 my-3 mx-3"
                        onClick={() => navigate(-1)}
                    />
                </div>
                <div className='pay_menu_type'>
                    <Nav defaultActiveKey="/" as="ul" className="navbar justify-content-evenly">
                        <Nav.Item as="li">
                            <Nav.Link to="/paypal" eventKey="link-1" className="fw-bold" activeClassName="">Paypal</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link to="/" eventKey="link-2" className="fw-bold" activeClassName="active">Credit Card</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link to="/paypal" eventKey="link-3" className="fw-bold" activeClassName="">Visa</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
            </div>
        </>
    )
}

export default PayTopBar