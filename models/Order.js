const { TOO_MANY_REQUESTS } = require('http-status-codes');
const {Schema,model}=require('mongoose');

const singleCartItemSchema=new Schema({
    image:{type:String,required:true},
    name:{type:String,required:true},
    price:{type:Number,required:true},
    amount:{type:Number,required:true},
    product:{type:Schema.Types.ObjectId,ref:'Product',required:true},   
})

const orderSchema=new Schema({
    tax:{type:Number,required:true},
    shippingFee:{type:Number,required:true},
    subtotal:{type:Number,required:true},
    total:{type:Number,required:true},
    cartItems:[
        {
            type:singleCartItemSchema,
            required:true,
        }
    ],
    status:{
        type:String,
        enum:['pending','failed','paid','delivered','cancelled'],
        default:'pending',  
    },
    user:{type:Schema.Types.ObjectId,ref:'User',required:true},
    clientSecret:{type:String,
        required:true,
    },
    paymentIntentId:{type:String},
},{timestamps:true});
module.exports=model('Order',orderSchema);  