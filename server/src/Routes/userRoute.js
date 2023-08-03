const express = require('express');
const { registerUser, loginUser ,logout,getAllUser, getSingleUser, updateUserRole, deleteUser} = require('../controllers/userController');
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth')
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
// router.route("/password/forgot").post(forgotPassword)
// router.route("/password/reset/:token").put(resetPassword)
router.route("/logout").get(logout)

router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUser)
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)
    .put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole)
    .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser)

module.exports = router;