const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require("../Schema/userSchema");
const sendToken = require("../utils/jwtTokens");
const cloudinary = require("cloudinary").v2;


cloudinary.config({
    cloud_name: "dijdjkiqv" ,
    api_key: "772671317228152" ,
    api_secret: "G0Yxb_-1oQNDpFZTyuvH0v35LyA"
});


// Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a sample id",
            url: "profilePicUrl"
        }
    });

    const token = user.getJWTToken();

    sendToken(user, 201, res);
})

// login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if (await isPasswordMatched == false) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const token = user.getJWTToken();

    sendToken(user, 200, res);
})

// logout user
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("tokenjwt", null, {
        expires: new Date(Date.now()),
        httponly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out"
    })
})

// Get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
})

// Update user Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched)
        return next(new ErrorHandler("old password is incorrect", 400));

    if (req.body.newPassword != req.body.confirmPassword)
        return next(new ErrorHandler("passwword does not matched", 400));

    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
})

// Update Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email
    }
    // Here avatar will add....
    const user = await User.findByIdAndUpdate(req.user.id, newUser, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

// Get All Users (Admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

// Get Single User Detail (Admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user)
        return next(new ErrorHandler(`User does not exists with Id : ${req.params.id}`, 400));

    res.status(200).json({
        success: true,
        user
    })
})

// Update user role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    // Here avatar will add....
    const user = await User.findByIdAndUpdate(req.params.id, newUser, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    if (!user)
        return next(new ErrorHandler(`User does not exists with Id : ${req.params.id}`, 400));

    res.status(200).json({
        success: true
    })
})

// Delete user -- Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user)
        return next(new ErrorHandler(`User does not exists with Id : ${req.params.id}`, 400));

    await user.remove();
    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })
})