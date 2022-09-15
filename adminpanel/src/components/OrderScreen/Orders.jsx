import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import Sidebar from '../Sidebar/Sidebar'

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllOrders();
    }, [])

    const getAllOrders = async () => {
        let data = await fetch('http://192.168.1.30:8080/api/order/allorders');
        data = await data.json();
        console.log(data);
        setOrders(data);
    }

    const orderDeliver = async (orderid) => {
        console.log(orderid);
        let result = await fetch('http://192.168.1.30:8080/api/order/deliverorder', {
            method: "POST",
            body: JSON.stringify({ orderid }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        alert("Delivered Success");
        console.log(result);
        let data = await fetch("http://192.168.1.30:8080/api/order/allorders");
        data = await data.json();
        setOrders(data);
        navigate('/orders');
    }

    return (
        <>
            <Sidebar />

            <div className='orderScreen w-100 mx-3 mt-3'>
                <div className='text-center'>
                    <h1 className='orderScreenTItle mb-3'>Orders</h1>
                </div>


                <Table bordered hover>
                    <thead>
                        <tr>
                            <th scope="col">OrderID</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Products</th>
                            <th scope="col">Product Quantity</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Shipping Address</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{order._id}</td>
                                        <td>{order.user.user_name}</td>
                                        <td>
                                            {
                                                order.products.map((product, index) => {
                                                    return (
                                                        <p key={index}> {product.product_name}</p>
                                                    )
                                                })
                                            }
                                        </td>
                                        <td>
                                            {
                                                order.products.map((product, index) => {
                                                    return (
                                                        <p key={index}> {product.product_quantity}</p>
                                                    )
                                                })
                                            }
                                        </td>
                                        <td>$ {order.amount}</td>
                                        <td>{order.shippingAddress}</td>
                                        <td>{order.isDelivered ?
                                            (<h6 className="text-success">Delivered</h6>)
                                            :
                                            (<Button variant="danger"
                                                onClick={() => orderDeliver(order._id)}
                                            >
                                                Deliver
                                            </Button>)

                                        }
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </Table>
            </div>
        </>
    );
}


export default Orders;