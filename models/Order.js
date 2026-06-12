const {Schema,model}=require('mongoose');

const orderSchema=new Schema({
    tax:{type:Number},
    shippingFee:{type:Number},
    subtotal:{type:Number},
    total:{type:Number},
    orderItems:[{
        name:{type:String},
        quantity:{type:Number},
        image:{type:String},
        price:{type:Number},
        product:{type:Schema.Types.ObjectId,ref:'Product',required:true}
    }],
    user:{type:Schema.Types.ObjectId,ref:'User',required:true},
    clientSecret:{type:String},
    paymentId:{type:String},
})