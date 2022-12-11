const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const crypto = require("crypto");

const userSchema=new mongoose.Schema({
    first_name:{
        type:String,
        required:[true,'pls enter your name'],
        maxlength:[20,'name cannot exceed 2p char'],
        minlength:[4,'name should have more than 4 char']
    },
    last_name:{
        type:String,
        required:[true,'pls enter your name'],
        maxlength:[20,'name cannot exceed 2p char'],
        minlength:[4,'name should have more than 4 char']
    },
    email:{
        type:String,
        required:[true,'pls enter your email'],
        unique:true,
        validate:[validator.isEmail,'pls anter avalid email']
    },
    password:{
        type:String,
        required:[true,'pls enter your password'],
        minlength:[3,'password should be grather than 3 char'],
        select:false,
    },
    phone_no:{
        type:Number,
        required:[true,"pls enter 10 digit"]
    },
    gender:{
        type:String,
        required:[false,"pls select gender"]
    },
    dob:{
        type:String,
        required:[true,"pls select dob"]
    }
    ,
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
    },
            
    role:{
        type:String,
        default:"user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password =await bcrypt.hash(this.password,10)
})
//JWT Token
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}
//compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
//generating password reset token
userSchema.methods.getResetPasswordToken = function(){
    //Generating token
    const resetToken = crypto.randomBytes(20).toString("hex");
    //Hashing and add to userschema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;

}


module.exports = mongoose.model("User",userSchema);