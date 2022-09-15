import React from 'react'
import './widgetsm.css'
import { Visibility } from '@material-ui/icons'
import image from '../../images/images.jpeg'
import img from '../../images/img.jpeg'

const WidgetSm = () => {
    return (
        <div className='widgetsm p-3 ms-3'>
            <span className='widgetsmTitle'>New Join Members</span>
            <ul className='widgetsmList my-3 p-0'>

                <li className='widgetsmListItem d-flex align-items-center justify-content-between mb-2'>
                    <img src={image} alt='user' className='widgetsmImage' />
                    <div className='widgetsmUser d-flex flex-column ms-2'>
                        <span className='widgetsmUsername'>Anna Keller</span>
                        <span className='widgetsmUserTitle'>Software Engineer</span>
                    </div>
                    <button className='widgetsmButton d-flex align-items-center justify-content-center border-0 ms-3'>
                        <Visibility className="widgetsmIcon" />
                        Display
                    </button>
                </li>

                <li className='widgetsmListItem d-flex align-items-center justify-content-between mb-2'>
                    <img src={img} alt='user' className='widgetsmImage' />
                    <div className='widgetsmUser d-flex flex-column ms-2'>
                        <span className='widgetsmUsername'>Susan Carol</span>
                        <span className='widgetsmUserTitle'>Software Engineer</span>
                    </div>
                    <button className='widgetsmButton d-flex align-items-center justify-content-center border-0 ms-3'>
                        <Visibility className="widgetsmIcon" />
                        Display
                    </button>
                </li>

                <li className='widgetsmListItem d-flex align-items-center justify-content-between mb-2'>
                    <img src={image} alt='user' className='widgetsmImage' />
                    <div className='widgetsmUser d-flex flex-column ms-2'>
                        <span className='widgetsmUsername'>Anna Keller</span>
                        <span className='widgetsmUserTitle'>Software Engineer</span>
                    </div>
                    <button className='widgetsmButton d-flex align-items-center justify-content-center border-0 ms-3'>
                        <Visibility className="widgetsmIcon" />
                        Display
                    </button>
                </li>

                <li className='widgetsmListItem d-flex align-items-center justify-content-between mb-2'>
                    <img src={img} alt='user' className='widgetsmImage' />
                    <div className='widgetsmUser d-flex flex-column ms-2'>
                        <span className='widgetsmUsername'>Susan Carol</span>
                        <span className='widgetsmUserTitle'>Software Engineer</span>
                    </div>
                    <button className='widgetsmButton d-flex align-items-center justify-content-center border-0 ms-3'>
                        <Visibility className="widgetsmIcon" />
                        Display
                    </button>
                </li>

                <li className='widgetsmListItem d-flex align-items-center justify-content-between mb-2'>
                    <img src={image} alt='user' className='widgetsmImage' />
                    <div className='widgetsmUser d-flex flex-column ms-2'>
                        <span className='widgetsmUsername'>Anna Keller</span>
                        <span className='widgetsmUserTitle'>Software Engineer</span>
                    </div>
                    <button className='widgetsmButton d-flex align-items-center justify-content-center border-0 ms-3'>
                        <Visibility className="widgetsmIcon" />
                        Display
                    </button>
                </li>

                <li className='widgetsmListItem d-flex align-items-center justify-content-between mb-2'>
                    <img src={img} alt='user' className='widgetsmImage' />
                    <div className='widgetsmUser d-flex flex-column ms-2'>
                        <span className='widgetsmUsername'>Susan Carol</span>
                        <span className='widgetsmUserTitle'>Software Engineer</span>
                    </div>
                    <button className='widgetsmButton d-flex align-items-center justify-content-center border-0 ms-3'>
                        <Visibility className="widgetsmIcon" />
                        Display
                    </button>
                </li>

                <li className='widgetsmListItem d-flex align-items-center justify-content-between mb-2'>
                    <img src={image} alt='user' className='widgetsmImage' />
                    <div className='widgetsmUser d-flex flex-column ms-2'>
                        <span className='widgetsmUsername'>Anna Keller</span>
                        <span className='widgetsmUserTitle'>Software Engineer</span>
                    </div>
                    <button className='widgetsmButton d-flex align-items-center justify-content-center border-0 ms-3'>
                        <Visibility className="widgetsmIcon" />
                        Display
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default WidgetSm