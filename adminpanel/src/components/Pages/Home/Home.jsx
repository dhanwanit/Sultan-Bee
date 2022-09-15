import React from 'react'
import FeaturedInfo from '../../FeaturedInfo/FeaturedInfo'
import Chart from '../../Chart/Chart'
import './home.css'
import { userData } from '../../../dummyData'
import WidgetSm from '../../Widgets/WidgetSm'
import WidgetLg from '../../Widgets/WidgetLg'
import Sidebar from '../../Sidebar/Sidebar'

const Home = () => {
    return (
        <>
            <Sidebar />
            <div className='home'>
                <FeaturedInfo />
                <Chart data={userData} title="User Analytics" grid dataKey="Active User" />
                <div className='homeWidgets d-flex m-3'>
                    <WidgetSm />
                    <WidgetLg />
                </div>
            </div>
        </>
    )
}

export default Home