import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PayTopBar from './PayTopBar'
import Paypal from './Paypal'
import PayCard from './PayCard'


const PayRoute = () => {
    return (
        <>
            <PayTopBar />
            <Routes>
                <Route path='/' element={<PayCard />} />
                <Route path='/paypal' element={<Paypal />} />
                {/* <Route path='/visa' element={<Visa />} /> */}
            </Routes>
        </>
    )
}

export default PayRoute