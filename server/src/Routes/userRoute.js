const express = require('express');
const { registerUser, brokerRegister, loginUser, logout, getAllUser, getSingleUser, updateUserRole, deleteUser, sendMail,getApproval, rejectApproval,getAllBrokers, getSingleBroker, updateBroker } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')
const router = express.Router();
const upload = require('../utils/multer');


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

router.route("/broker/:userId").get(getSingleBroker).put(upload.fields([{ name: 'a', maxCount: 5 }, { name: 'b', maxCount: 5 }, { name: 'c', maxCount: 5 }, { name: 'd', maxCount: 5 }, { name: 'e', maxCount: 5 }, { name: 'f', maxCount: 5 },]), brokerRegister);
router.route("/broker/approve/:userId").put(getApproval);
router.route("/broker/reject/:userId").put(rejectApproval);
router.route("/brokers").get(getAllBrokers);
router.route("/update/broker/:userId").put(updateBroker);

router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser)
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)


module.exports = router;