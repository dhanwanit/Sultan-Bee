import React from 'react'
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './chart.css'

const Chart = ({data,title,grid,dataKey}) => {

    return (
        <div className='chart m-3 p-3'>
            <h3 className='chartTitle fw-bold'>{title}</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={data}>
                    <XAxis dataKey="name" stroke='#5550bd' />
                    <Line type="monotone" dataKey={dataKey} stroke='#5550bd' />
                    <Tooltip />
                    {grid && <CartesianGrid strokeDasharray="5 5" stroke='#e0dfdf' />}
                    <Legend />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart