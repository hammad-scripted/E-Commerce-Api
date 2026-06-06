const Schema=require('mongoose').Schema;
const model=require('mongoose').model;
const bcrypt=require('bcryptjs');
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
},{
    timestamps: true
})

//? hash password using pre-hook


userSchema.pre('save',async function (){
    if(!this.isModified('password')) return;
    const salt =await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})
userSchema.post('save',function(){
    console.log('user saved successfully');
})

// ? compare password using instance method

userSchema.methods.comparePassword=async function (candidatePassword){
    const isMatch= await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
}
module.exports=model('User',userSchema);