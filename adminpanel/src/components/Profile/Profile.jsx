import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import './profile.css'
import swal from 'sweetalert';

const Profile = () => {
    const adminDetails = JSON.parse(localStorage.getItem("admin"));
    const [admin_name, setAdminName] = useState(adminDetails.admin_name);
    const [email, setEmail] = useState(adminDetails.email);
    const [admin_images, setAdminImage] = useState(adminDetails.admin_images);
    const navigate = useNavigate();

   

    const updateProfile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('admin_name', admin_name);
        formData.append('email', email);
        formData.append('admin_images', admin_images);
        let result = await fetch(`http://192.168.1.30:8080/api/admin/update_admin_profile/${adminDetails._id}`, {
            method: "PUT",
            body: formData
        })
        result = await result.json();
        // console.log(result);
        localStorage.setItem("admin", JSON.stringify(result));
        navigate('/profile');
        swal({ title: "Profile Successfully Updated!", icon: "success" });
    }


    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <img
                            src={adminDetails.admin_images} alt="profile"
                            style={{
                                width: "60%",
                                height: "400px",
                                marginTop: "15%",
                                marginLeft: "10%"
                            }} />
                    </Col>
                    <Col>
                        <h1 className='text-center pb-3 pt-3'>Admin Profile</h1>
                        <Form onSubmit={updateProfile}>
                            <Form.Group className="mb-4" controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={admin_name}
                                    onChange={(e) => setAdminName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Group className="mb-4" controlId="formBasicEmail">
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Label>Profile Image</Form.Label>
                            <Form.Group className="mb-4" controlId="formGridImage">
                                <Form.Control
                                    type="file"
                                    onChange={(e) => setAdminImage(e.target.files[0])}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                className='adminUpdateButton'
                            >
                                Update
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Profile