import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import PaymentCard from '../images/payment-card.png';

const PaymentImgSlider = () => {
    return (
        <Carousel className='Carousel_slider ms-0 mt-3 w-auto'>
            <div className='slider_image'>
                <img src={PaymentCard} alt="Card" />
            </div>
            <div className='slider_image'>
                <img src={PaymentCard} alt="Card" />
            </div>
            <div className='slider_image'>
                <img src={PaymentCard} alt="Card" />
            </div>
        </Carousel>
    )
}

export default PaymentImgSlider