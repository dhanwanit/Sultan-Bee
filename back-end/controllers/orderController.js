const Orderes  = require("../models/orderModel");

exports.addOrderItems = async(req,res)=>{

    const {orderItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

        if(orderItems && orderItems.length===0)
        {
            res.status(400)
            throw new Error('No Order Found')
            return
        }else{
            const order = new Orderes({
                orderItems,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                taxPrice,
                shippingPrice,
                totalPrice,
            })

            const createOrder = await order.save()
            res.status(201).json(createOrder)

        }
}
