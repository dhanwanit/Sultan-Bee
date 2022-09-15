
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import { IoIosArrowBack } from 'react-icons/io'
import BottomMenu from '../component/Header/BottomMenu'
import "../Css/HotelLocation.css"

const HotelLocation = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='hotel_location'>
                <div className="header h-50 text-white fw-bold d-flex">
                    <IoIosArrowBack onClick={() => navigate(-1)} className="my-3 ms-3" />
                    <p className='cart'>List</p>
                </div>
                <div className='hotel_on_map position-relative vh-100'>
                    {/* <span className='dot dot_one'><span className='small_dot'></span></span>
                    <span className='dot dot_two'><span className='small_dot'></span></span>
                    <span className='dot dot_three'><span className='small_dot'></span></span>
                    <span className='dot dot_four'><span className='small_dot'></span></span>
                    <span className='dot dot_five'><span className='small_dot'></span></span>
                    <span className='dot dot_six'><span className='small_dot'></span></span>
                    <span className='dot dot_seven'><span className='small_dot'></span></span> */}
                </div>
                <Container>
                    <div className="map_btn_div position-fixed">
                        <Button
                            variant="primary"
                            type="submit"
                            className="map_btn text-uppercase border-0"
                            onClick={() => navigate('/hotel-location')}
                        >List</Button>
                    </div>
                    <BottomMenu />
                </Container>
            </div>
        </>
    )
}

export default HotelLocation
