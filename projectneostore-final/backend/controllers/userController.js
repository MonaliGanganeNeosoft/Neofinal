const ErrorHander=require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");
const cloudinary = require("cloudinary");


//Register user
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
    
    const {first_name,last_name,email,password,phone_no,dob,gender}=req.body;
    const user = await User.create({
        first_name,last_name,email,password,phone_no,gender,dob,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        },
    });
    sendToken(user,201,res)
})
//login User
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;
    //checking if user has given password and email both
    if(!email || !password){
        return next(new ErrorHander("pls enter a email and password",400));
    }
    const user =await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHander("Invalid email or password",401))
    }
    const isPasswordMatched =await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password",401))
    }
    sendToken(user,200,res)
    // const token = user.getJWTToken();
    // res.status(201).json({
    //     success:true,
    //     user,
    //     token,
    // })
});
//logout user
exports.logout = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })
    res.status(200).json({
        success:true,
        message:"Logged Out",
    })
})
//forget password
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new Errorhandler("user not found",404));
    }
    //get resetpassword token
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});
    const resetPasswordUrl = `${process.env.FRONTENT_URL}/password/reset/${resetToken}`;
    const message = `your password reset token is :-\n\n ${resetPasswordUrl} \n\nif yoy not requested this email 
    then ,pls ignore it`;
    try{
        await sendEmail({
            email:user.email,
            subject:`Ecommerce password recory`,
            message,
        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`,
        });

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false});
        return next(new Errorhandler(error.message,500));
    }
});
//reset password
exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{
    const resetPasswordToken = crypto
    //creating token hash
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    });
    if(!user){
        return next(new ErrorHander("Reset password Token is invalid or has been expired",400));
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHander("Password does not password",400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user,200,res);

});
//get user detail
exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user,
    });
});
//update user password
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password") ;

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHander("old password is incorrect",400));
    }
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHander("password does not match",400));
    }
    user.password =req.body.newPassword;
    
    await user.save();
    sendToken(user,200,res);
});
//update user profile
exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{
    const newUserData = {
        first_name:req.body.first_name,
        email:req.body.email,
    };
    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
    
        const imageId = user.avatar.public_id;
    
        await cloudinary.v2.uploader.destroy(imageId);
    
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });
    
        newUserData.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        }
      }
  
    //we will add cloudinary later
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        success:true,
    });
 });

//get all users(admin)
exports.getAllUser = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        success:true,
        users,
    });
});
//get single users(admin)
exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(
            new ErrorHander(`User does not exist with Id: ${req.params.id}`)
            );
    }
    res.status(200).json({
        success:true,
        user,
    });
});
//update User Role ->admin
exports.updateUserRole = catchAsyncErrors(async(req,res,next)=>{
    const newUserData = {
        first_name:req.body.first_name,
        email:req.body.email,
        role:req.body.role,
    };
    
    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        success:true,
        
    });
 });
//delete User  ->admin
exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    //we will remove cloidinary later

    if(!user){
        return next(
            new ErrorHander(`User does not exist with Id: ${req.params.id}`)
        );
    }
    await user.remove();
    res.status(200).json({
        success:true,
        message:"User deleted successfully"
    });
 });

