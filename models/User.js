const Schema=require('mongoose').Schema;
const model=require('mongoose').model;
const validator=require('validator');
const userSchema=new Schema({

    name:{type: String, required: [true, 'Please provide name'],minlength: 3, maxlength: 50},
    email:{type: String, required: [true, 'Please provide email'],
        validate:{
            validator: validator.isEmail
            ,message: 'Please provide a valid email'

        }, unique: true},
    password:{type: String, required: [true, 'Please provide password'], minlength: 6},
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user',

    }
})

module.exports=model('User',userSchema);