const {mongoose,Schema,model}=require('mongoose');

const reviewSchema=new Schema({
    rating:{
        type:Number,
        min:1,
        max:5,
        required:[true,'Please provide rating']
    },
    title:{
        type:String,
        trim:true,
        required:[true,'Please provide review title'],
        maxlength:100   
    },
    comment:{
        type:String,
        required:[true,'Please provide review text'],
        maxlength:1000
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true       
    }
    ,
    product:{
        type:Schema.Types.ObjectId,
        ref:'Product',
        required:true   
    }
},{timestamps:true});

model.exports=model('Review',reviewSchema);