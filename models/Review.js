const {Schema,model}=require('mongoose');

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

// * compound indexing 
// ? only one review per user per product
reviewSchema.index({product:1,user:1},{unique:true} );

reviewSchema.post("save",async function(next){
    console.log(this);
    console.log('just saved a review')

})
reviewSchema.post("remove",async function(next){
    console.log(this);
    console.log('just removed a review')
})

module.exports=model('Review',reviewSchema);