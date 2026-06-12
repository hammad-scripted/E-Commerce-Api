const Order=require('../models/Order');

const createOrder=async()=>{
    res.send('create order' );
}

const getAllOrders=async()=>{
    res.send('get all orders' );
}
const getSingleOrder=async()=>{
    res.send("get single order");
}
const getCurrentUserOrders=async()=>{
    res.send("get current user orders");
}
const updateOrder=async()=>{
    res.send("update order");
}


module.exports={
    createOrder,
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    updateOrder,
    }