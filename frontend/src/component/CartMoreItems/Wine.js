import React, { useState } from 'react'
import Collapsible from "react-collapsible";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import redwine from '../../images/red-wine.png';
import rosewine from '../../images/rose-wine.png';
import whitewine from '../../images/white-wine.png';
import Button2 from "../Button2"

const Wine = () => {
    const [text, setText] = useState(false);
    return (
        <>
            <div className='accordion position-relative my-3 my-xl-4 mx-3 py-2'>
                {text == true ? (
                    <p className="text_true position-absolute text-dark fw-bold start-0">Wine</p>
                ) : (
                    <p className="text_false position-absolute">Wine</p>
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
                    <div className="accordion_content d-flex align-items-center justify-content-between mb-3">
                        <div className='image_div' >
                            <img src={redwine} alt="redwine" />
                        </div>
                        <div className="accordion_detail mt-2">
                            <p className="mb-0">Red Wine</p>
                            <p className="mb-0">$50</p>
                        </div>
                        <Button2 />
                    </div>

                    <div className="accordion_content d-flex align-items-center justify-content-between mb-3">
                        <div className='image_div'>
                            <img src={rosewine} alt="rosewine" />
                        </div>
                        <div className="accordion_detail">
                            <p className="mb-0">Rose Wine</p>
                            <p className="mb-0">$100</p>
                        </div>
                        <Button2 />
                    </div>

                    <div className="accordion_content d-flex align-items-center justify-content-between mb-3">
                        <div className='image_div'>
                            <img src={whitewine} alt="whitewine" />
                        </div>
                        <div className="accordion_detail">
                            <p className="mb-0">White Wine</p>
                            <p className="mb-0">$150</p>
                        </div>
                        <Button2 />
                    </div>
                </Collapsible>
            </div>
        </>
    )
}

export default Wine