import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { KeyboardArrowLeftOutlined, MoreVert } from '@mui/icons-material'
import image from '../images/hamburg.jpg'

const Orders = () => {
    const navigate = useNavigate();


    return (
        <div className='orderScreen'>
            <div className="profileIcon">
                <div className="hotelarrow d-flex align-items-center justify-content-between">
                    <KeyboardArrowLeftOutlined onClick={() => navigate(-1)} />
                    <p>Orders</p>
                    <MoreVert />
                </div>
            </div>

            <div className='orders d-flex align-items-center mt-4'>
                <div className='left mx-3'>
                    <img src={image} alt="order" className='orderImage' />
                </div>
                <div className='right mx-3'>
                    <h3>Corral Special</h3>
                    <p>$119</p>
                </div>
            </div>
        </div>
    )
}

export default Orders