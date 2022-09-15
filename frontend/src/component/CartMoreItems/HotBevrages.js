import React, { useState } from 'react'
import Collapsible from "react-collapsible";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import coffee from "../../images/mug-with-hot-beverage.jpg";
import Cuppacino from "../../images/coffee.jpg";
import Greentea from "../../images/green_tea.jpeg";
import Button2 from "../Button2"
const HotBevrages = () => {
    const [text, setText] = useState(false);
    return (
        <>
            <div className='accordion position-relative my-3 my-xl-4 mx-3 py-2'>
                {text == true ? (
                    <p className="text_true position-absolute text-dark fw-bold start-0">Hot Bevrages</p>
                ) : (
                    <p className="text_false position-absolute">Hot Bevrages</p>
                )}

                <Collapsible
                    trigger={<BiChevronDown onClick={() => setText(true)} className="openArrow" />}
                    triggerWhenOpen={
                        <BiChevronUp
                            onClick={() => setText(false)}
                            style={{ color: "rgb(243, 142, 10)" }}
                            className="openArrow"
                        />
                    }
                >
                    <div className="accordion_content d-flex align-items-center justify-content-between mb-2">
                        <div className='image_div'>
                            <img src={Greentea} alt="Greentea" className='img-fluid' />
                        </div>
                        <div className="accordion_detail mt-2">
                            <p className="mb-0">Green Tea</p>
                            <p className="mb-0">$10</p>
                        </div>
                        <Button2 />
                    </div>

                    <div className="accordion_content d-flex align-items-center justify-content-between mb-2">
                        <div className='image_div'>
                            <img src={coffee} alt="coffee" className='img-fluid' />
                        </div>
                        <div className="accordion_detail mt-2">
                            <p className="mb-0">Hot Coffee</p>
                            <p className="mb-0">$20</p>
                        </div>
                        <Button2 />
                    </div>

                    <div className="accordion_content d-flex align-items-center justify-content-between mb-2">
                        <div className='image_div'>
                            <img src={Cuppacino} alt="Cuppacino" className='img-fluid' />
                        </div>
                        <div className="accordion_detail mt-2">
                            <p className="mb-0">Cuppacino</p>
                            <p className="mb-0">$30</p>
                        </div>
                        <Button2 />
                    </div>

                </Collapsible>
            </div>
        </>
    )
}

export default HotBevrages