const express = require("express");
// const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth');
const {addProperties,addReviews,getSingleProperty,getAllProperty,deleteProperty, deleteReview, updateProperties, addAmenities, deleteAmenities} = require("../controllers/propertyController");
const router = express.Router();

router.route("/add/property/:brokerId").post(addProperties);
router.route("/update/property/:propertyId").put(updateProperties);
router.route("/aminities/:propertyId").put(addAmenities).delete(deleteAmenities);
router.route("/:userId/review/:propertyId").post(addReviews).delete(deleteReview);
router.route("/property/:propertyId").get(getSingleProperty).delete(deleteProperty);
router.route("/property").get(getAllProperty);

module.exports = router;