const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Property = require("../Schema/propertySchema")
const User = require("../Schema/userSchema");
const cloudinary = require("cloudinary").v2;


exports.addProperties = catchAsyncErrors(async (req, res, next) => {
    try {
        // const propertyImages = req.files.propertyPhotos;

        const propertyToBeAdd = new Property(req.body);
        propertyToBeAdd.broker_id = req.params.brokerId;
        const amenitiesArray = req.body.amenities.split(',').map(item => item.trim());
        propertyToBeAdd.amenities = amenitiesArray;

        // const propertyImagesArray = Array.isArray(propertyImages) ? propertyImages : [propertyImages];

        // for (const photo of propertyImagesArray) {
        //     try {
        //         const propertyImage = await cloudinary.uploader.upload(photo.tempFilePath, {folder: 'VerifiedBroker' });
        //         const uploadImage = {
        //             public_id: propertyImage.public_id,
        //             url: propertyImage.url
        //         }
        //         propertyToBeAdd.p_Images.push(uploadImage);
        //     } catch (error) {
        //         console.error(error);
        //         return next(new ErrorHandler('Unable to upload image(s) to Cloudinary', 400));
        //     }
        // }

        await propertyToBeAdd.save();

        res.status(201).json({
            success: true,
            property: propertyToBeAdd,
        });

    } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Failed to add property', 400));
    }
});


exports.updateProperties = catchAsyncErrors(async (req, res, next) => {
    try {
        const propertyId = req.params.propertyId;
        const updatedData = req.body;

        const existingProperty = await Property.findById(propertyId);

        if (!existingProperty) {
            return next(new ErrorHandler('Unable to find property', 400));
        }

        Object.assign(existingProperty, updatedData);

        await existingProperty.save();

        res.status(200).json({
            success: true,
            property: existingProperty,
        });

    } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Failed to update property', 400));
    }
});

exports.addAmenities = catchAsyncErrors(async (req, res, next) => {

    try {
        const existProperty = await Property.findOne({ _id: req.params.propertyId });

        const amenitiesArray = req.body.amenities.split(',').map(item => item.trim());

        const existingAmenities = existProperty.amenities || [];

        const updatedAmenities = existingAmenities.concat(amenitiesArray);

        existProperty.amenities = updatedAmenities;

        await existProperty.save();

        res.status(200).json({
            success: true,
            message: 'Amenities added successfully',
            amenities: existProperty.amenities
        });

    } catch (error) {
        return next(new ErrorHandler('Unable to find property', 400));
    }

})

exports.deleteAmenities = catchAsyncErrors(async (req, res, next) => {
    try {
        const existProperty = await Property.findOne({ _id: req.params.propertyId });
        if (!existProperty) {
            return next(new ErrorHandler('Unable to find property', 400));
        }

        const amenitiesToDelete = req.body.amenities.split(',').map(item => item.trim());

        const existingAmenities = existProperty.amenities || [];

        const updatedAmenities = existingAmenities.filter(amenity => !amenitiesToDelete.includes(amenity));

        existProperty.amenities = updatedAmenities;

        await existProperty.save();

        res.status(200).json({
            success: true,
            message: 'Amenities deleted successfully',
            amenities: existProperty.amenities
        });
    } catch (error) {
        return next(new ErrorHandler('Error deleting amenities', 500));
    }
});




exports.addReviews = catchAsyncErrors(async (req, res, next) => {
    try {
        const existProperty = await Property.findOne({ _id: req.params.propertyId });

        if (!existProperty) {
            return next(new ErrorHandler('Unable to find property', 400));
        }

        const user = await User.findOne({ _id: req.params.userId });

        if (!user) {
            return next(new ErrorHandler('Unable to find user', 400));
        } else {

            const existingReview = existProperty.reviews.find(review => review.userId.equals(user._id));

            if (existingReview) {
                return next(new ErrorHandler('You have already added a review for this property', 400));
            }

            const newRating = req.body.rating;
            const newReview = {
                userId: user._id,
                userName: user.name,
                rating: newRating,
                comment: req.body.comment
            };

            existProperty.reviews.push(newReview);

            const currentNumOfReviews = existProperty.numOfReviews;
            existProperty.numOfReviews = currentNumOfReviews + 1;

            const currentRatings = existProperty.ratings;
            const allRatingsSum = existProperty.reviews.reduce((sum, review) => sum + review.rating, 0);
            const newAverageRating = allRatingsSum / existProperty.numOfReviews;

            existProperty.ratings = newAverageRating;

            await existProperty.save();

            res.status(201).json({
                success: true,
                message: 'Review added successfully'
            });
        }

    } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Failed to add review', 400));
    }
})


exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    try {
        const existProperty = await Property.findOne({ _id: req.params.propertyId });

        if (!existProperty) {
            return next(new ErrorHandler('Unable to find property', 400));
        }

        const reviewIndex = existProperty.reviews.findIndex(review => review.userId.equals(req.params.userId));

        if (reviewIndex === -1) {
            return next(new ErrorHandler('Unable to find user and Failed to delete review', 400));
        }

        existProperty.reviews.splice(reviewIndex, 1);

        const currentNumOfReviews = existProperty.numOfReviews;
        existProperty.numOfReviews = currentNumOfReviews - 1;

        if (existProperty.numOfReviews > 0) {
            const allRatingsSum = existProperty.reviews.reduce((sum, review) => sum + review.rating, 0);
            const newAverageRating = allRatingsSum / existProperty.numOfReviews;
            existProperty.ratings = newAverageRating;
        } else {
            existProperty.ratings = 0;
        }

        await existProperty.save();

        res.status(201).json({
            success: true,
            message: 'Review deleted successfully'
        });

    } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Failed to delete review', 400));
    }
})




exports.getSingleProperty = catchAsyncErrors(async (req, res, next) => {
    try {
        const existProperty = await Property.findOne({ _id: req.params.propertyId });

        res.status(200).send({
            success: true,
            data: existProperty
        })

    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Property not found", 400))
    }
})


exports.getAllProperty = catchAsyncErrors(async (req, res, next) => {
    try {
        const properties = await Property.find();

        res.status(200).send({
            success: true,
            data: properties
        })

    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Property not found", 400))
    }
})


exports.deleteProperty = catchAsyncErrors(async (req, res, next) => {
    try {
        await Property.findByIdAndDelete(req.params.propertyId);
        res.status(200).send({
            success: true,
            data: "Property deleted suceessfully"
        })
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("unable to delete property", 400))
    }
})