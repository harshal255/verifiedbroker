const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require("../Schema/userSchema");
const sendToken = require("../utils/jwtTokens");
const nodemailer = require("nodemailer");
const cloudinary = require("../utils/cloudinary");

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

// exports.brokerRegister = catchAsyncErrors(async (req, res, next) => {
//     try {

//         const { phone, address, experience, about, reference } = req.body;

//         const user = await User.findOne({ _id: req.params.userId })

//         if (!user) {
//             return next(new ErrorHandler("Unable to find user", 401));
//         }

//         console.log(user);

//         const A = req.files.a;
//         const B = req.files.b;
//         const C = req.files.c;
//         const D = req.files.d;
//         const E = req.files.e;
//         const F = req.files.f;

//         const aType = A[0].mimetype.startsWith('image') ? 'image' : 'pdf';
//         const bType = B[0].mimetype.startsWith('image') ? 'image' : 'pdf';
//         const cType = C[0].mimetype.startsWith('image') ? 'image' : 'pdf';
//         const dType = D[0].mimetype.startsWith('image') ? 'image' : 'pdf';
//         const eType = E[0].mimetype.startsWith('image') ? 'image' : 'pdf';
//         const fType = F[0].mimetype.startsWith('image') ? 'image' : 'pdf';

//         let imageOfA, imageOfB, imageOfC, imageOfD, imageOfE, imageOfF;

//         try {
//             imageOfA = await cloudinary.uploader.upload(A[0].path, {
//                 resource_type: aType === 'image' ? 'image' : 'raw',
//                 format: 'pdf',
//                 folder: 'documents'
//             });
//             imageOfB = await cloudinary.uploader.upload(B[0].path, {
//                 resource_type: bType === 'image' ? 'image' : 'raw',
//                 format: 'pdf',
//                 folder: 'documents'
//             });
//             imageOfC = await cloudinary.uploader.upload(C[0].path, {
//                 resource_type: cType === 'image' ? 'image' : 'raw',
//                 format: 'pdf',
//                 folder: 'documents'
//             });
//             imageOfD = await cloudinary.uploader.upload(D[0].path, {
//                 resource_type: dType === 'image' ? 'image' : 'raw',
//                 format: 'pdf',
//                 folder: 'documents'
//             });
//             imageOfE = await cloudinary.uploader.upload(E[0].path, {
//                 resource_type: eType === 'image' ? 'image' : 'raw',
//                 format: 'pdf',
//                 folder: 'documents'
//             });
//             imageOfF = await cloudinary.uploader.upload(F[0].path, {
//                 resource_type: fType === 'image' ? 'image' : 'raw',
//                 format: 'pdf',
//                 folder: 'documents'
//             });
//         } catch (error) {
//             console.log(error);
//             return next(new ErrorHandler("Unable to upload(s) in cloudinary", 401));
//         }

//         const documentOfA = {
//             public_id: imageOfA.public_id,
//             url: imageOfA.url
//         }

//         const documentOfB = {
//             public_id: imageOfB.public_id,
//             url: imageOfB.url
//         }
//         const documentOfC = {
//             public_id: imageOfC.public_id,
//             url: imageOfC.url
//         }
//         const documentOfD = {
//             public_id: imageOfD.public_id,
//             url: imageOfD.url
//         }
//         const documentOfE = {
//             public_id: imageOfE.public_id,
//             url: imageOfE.url
//         }
//         const documentOfF = {
//             public_id: imageOfF.public_id,
//             url: imageOfF.url
//         }

//         user.brokerDetails = {
//             phone,
//             address,
//             experience,
//             about,
//             reference,
//             documentOfA,
//             documentOfB,
//             documentOfC,
//             documentOfD,
//             documentOfE,
//             documentOfF
//         };


//         console.log(user.brokerDetails);









//         res.status(200).send({
//             success: true,
//             data: user
//         })


//     } catch (error) {
//         console.log(error);
//         return next(new ErrorHandler("Broker not registered", 401));
//     }
// })

exports.brokerRegister = catchAsyncErrors(async (req, res, next) => {
    try {
        const { phone, address, experience, about, reference } = req.body;
        const { a, b, c, d, e, f } = req.files;

        const user = await User.findOne({ _id: req.params.userId });
        if (!user) {
            return next(new ErrorHandler("Unable to find user", 401));
        }

        const uploadAndCreateDocument = async (file) => {
            try {
                const type = file[0].mimetype.startsWith('image') ? 'image' : 'raw';
                const image = await cloudinary.uploader.upload(file[0].path, {
                    resource_type: type,
                    format: type === 'image' ? 'jpg' : 'pdf', // Set default format to 'jpg'
                    folder: 'documents'
                });

                return {
                    public_id: image.public_id,
                    url: image.url
                };
            } catch (error) {
                console.log(error);
                throw new ErrorHandler("Unable to upload(s) to Cloudinary", 401);
            }
        };

        const brokerDetails = {
            phone,
            address,
            experience,
            about,
            reference,
        };

        const properties = ['a', 'b', 'c', 'd', 'e', 'f'];

        for (const prop of properties) {
            if (req.files[prop]) {
                brokerDetails[prop] = await uploadAndCreateDocument(req.files[prop]);
            }
        }

        user.brokersDetails = brokerDetails;

        await user.save();

        res.status(200).json({
            success: true,
            data: user
        });

        const to = user.email;
        const subject = 'Approval request';
        const html = `<h1>Your registration is under inspection wait for approval....</h1>`;

        await exports.sendMail(to, subject, html);

    } catch (error) {
        console.error(error);
        return next(new ErrorHandler("Broker not registered", 401));
    }
});

exports.sendMail = async (to, subject, html) => {
    try {
        let transporter = await nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'Darshanpanchal9292@gmail.com',
                pass: 'tzyutbeyqlcurvzx'
            }
        });

        await transporter.sendMail({
            from: 'Darshanpanchal9292@gmail.com',
            to: to,
            subject: subject,
            html: html,
        });

        console.log('Email sent successfully');
    } catch (error) {
        console.log('Error sending email:', error);
    }
};

exports.getApproval = catchAsyncErrors(async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.userId });

        if (!user) {
            return next(new ErrorHandler("User not found", 400));
        }

        user.brokersDetails.isVerified = "true"
        user.role = "broker"

        await user.save();

        res.status(200).json({
            success: true,
            data: "Verified"
        });

        const to = user.email;
        const subject = 'Approval Status';
        const html = `<h1>Congratulations! You are approved as a broker</h1><br/>
        <h2>You can now proceed with the payment and log in to access your dashboard.</h2>`;

        await exports.sendMail(to, subject, html);


    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Unable to approve", 400));
    }
})

exports.rejectApproval = catchAsyncErrors(async (req, res, next) => {

    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $unset: { brokersDetails: 1 } },
            { new: true }
        );

        if (!updatedUser) {
            return next(new ErrorHandler("User not found", 400));
        }


        res.status(200).json({
            success: true,
            data: "Rejected"
        });

        const to = updatedUser.email;
        const subject = 'Approval Status';
        const html = `<h1>Your application to become a broker has been regretfully rejected</h1><br/>
        <h2>We appreciate your interest, but your application did not meet our current requirements for approval.</h2><br/>
        <h2>You are welcome to reapply after 7 days, ensuring all necessary documents are uploaded for verification.</h2>`;

        await exports.sendMail(to, subject, html);


    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Unable to Reject", 400));
    }
});

exports.updateBroker = catchAsyncErrors(async (req, res, next) => {
    try {

        const broker = await User.findOne({ _id: req.params.userId, role: "broker" });

        if (!broker) {
            return next(new ErrorHandler("Unable to find broker", 400));
        }

        for (const key in req.body) {
            broker.brokersDetails[key] = req.body[key];
        }

        await broker.save();

        res.status(200).send({
            success: true,
            broker
        });


    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Unable to update broker", 400));
    }
})

exports.getSingleBroker = catchAsyncErrors(async (req, res, next) => {
    try {

        const broker = await User.findOne({ _id: req.params.userId, role: "broker" });

        res.status(200).send({
            success: true,
            broker
        });

    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Unable to find broker", 400));
    }
})

exports.getAllBrokers = catchAsyncErrors(async (req, res, next) => {
    try {
        const brokers = await User.find({ role: "broker" });

        res.status(200).send({
            success: true,
            brokers
        });
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("No Brokers Found", 400));
    }
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

