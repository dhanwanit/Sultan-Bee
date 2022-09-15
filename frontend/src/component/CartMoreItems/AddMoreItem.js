import React, { useState } from "react";
import Collapsible from "react-collapsible";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import fries from "../../images/french-fries.png";
import shawarma from "../../images/shawarma.png";
import tortilla from "../../images/tortilla-tacos.png";
import Button2 from "../Button2"
const AddMoreItem = ({ itemId }) => {
    const [text, setText] = useState(false);


    return (
        <>
            <div className='accordion position-relative my-3 my-xl-4 mx-3 py-2'>
                {text == true ? (
                    <p className="text_true position-absolute text-dark fw-bold start-0">Add More items</p>
                ) : (
                    <p className="text_false position-absolute">Add More items</p>
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
                            <img src={fries} alt="fries" />
                        </div>
                        <div className="accordion_detail mt-2">
                            <p className="mb-0">French Fries</p>
                            <p className="mb-0">$10</p>
                        </div>
                        <div>
                            <Button2 />
                        </div>

                    </div>



                    <div className="accordion_content d-flex align-items-center justify-content-between mb-2">
                        <div className='image_div'>
                            <img src={shawarma} alt="shawarma"/>
                        </div>
                        <div className="accordion_detail mt-2">
                            <p className="mb-0">Shawarma</p>
                            <p className="mb-0">$20</p>
                        </div>
                        <div>
                            <Button2 />
                        </div>
                    </div>

                    <div className="accordion_content d-flex align-items-center justify-content-between mb-2">
                        <div className='image_div'>
                            <img src={tortilla} alt="tortilla"/>
                        </div>
                        <div className="accordion_detail mt-2 ">
                            <p className="mb-0">Tortilla Tacos</p>
                            <p className="mb-0">$30</p>
                        </div>
                        <div>
                            <Button2 />
                        </div>
                    </div>
                </Collapsible>
            </div>
        </>
    );
};

export default AddMoreItem;
