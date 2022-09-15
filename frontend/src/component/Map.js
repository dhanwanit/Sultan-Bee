import React, { useState } from "react";
import { MdLocationPin } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import Image from "../images/UI-15.png";

const Map = () => {
    const [location, setLocation] = useState("");
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        setLocation(e.target.value);
        console.log(location);
        setTimeout(() => {
            navigate('/login');
        }, 500);

    }
    return (
        <>
            <div
                className="position-relative vh-100"
                style={{
                    backgroundImage: `url(${Image})`,
                    backgroundSize: "100% 100%",
                }}
            >
                <div className="position-absolute my-4 mx-4 mx-xl-5 ps-xl-5 text-capitalize">
                    <div className="mx-xl-5 ps-xl-5">
                        <h2 className="lh-base mx-xl-5 ps-xl-5">
                            Enjoy your life leave the
                            rest to
                            <span
                                style={{ color: "rgb(243, 142, 10)" }}
                                className="fw-bold"
                            > sultanbee</span>
                        </h2>
                    </div>
                </div>

                <div className="location-box position-fixed start-0 bottom-0 w-100"
                    style={{ background: "rgb(243, 142, 10)" }}
                >
                    <select
                        onChange={onChangeHandler}
                        value={location}
                        className='selected_location mt-4 border-0 ps-3 d-block mx-auto bg-white'

                    >
                        <option value='location'>Select Location</option>
                        <option value='Sweden'>Sweden</option>
                        <option value='London'>London</option>
                        <option value='India'>India</option>
                        <option value='UK'>UK</option>
                        <option value='Canada'>Canada</option>
                    </select>

                    <p className="loc_address mx-4 ms-xl-5 ps-xl-5 mt-3">
                        <MdLocationPin className="loc_icon" />
                        <span> Current Location - </span>
                        {
                            location === 'Sweden' ? '143 Sweden, 37920'
                                : location === 'London' ? '150 London, 87650'
                                    : location === 'India' ? '108 India, 462021'
                                        : location === 'UK' ? '34 UK, 12345'
                                            : location === 'Canada' ? '89 Canada, 096456'
                                                : ''
                        }
                    </p>
                </div>
            </div>
        </>
    );
};

export default Map;
