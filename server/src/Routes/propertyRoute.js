const express = require("express");
// const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth');
const { addProperties, addReviews, getSingleProperty, getAllProperty, deleteProperty, deleteReview, updateProperties, addAmenities, deleteAmenities, updateImages } = require("../controllers/propertyController");
const router = express.Router();
const upload = require('../utils/multer');

router.route("/add/property/:brokerId").post(upload.fields([{ name: 'propertyPhotos', maxCount: 5 },]), addProperties);
router.route("/update/property/:propertyId").put(updateProperties);
router.route("/update/images/:propertyId").put(upload.fields([{ name: 'propertyPhotos', maxCount: 5 },]),updateImages);
router.route("/amenities/:propertyId").put(addAmenities).delete(deleteAmenities);
router.route("/:userId/review/:propertyId").post(addReviews).delete(deleteReview);
router.route("/property/:propertyId").get(getSingleProperty).delete(deleteProperty);
router.route("/property").get(getAllProperty);

module.exports = router;