const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const profileUpload = require("../middleware/profileUpload");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get(
    "/profile",
    authMiddleware,
    authController.profile
);

router.put(
    "/profile",
    authMiddleware,
    authController.updateProfile
);

router.post(
    "/profile/upload",
    authMiddleware,
    profileUpload.single("profile_image"),
    authController.uploadProfilePicture
);

router.get(
    "/admin",
    authMiddleware,
    roleMiddleware("Admin"),
    authController.adminDashboard
);

module.exports = router;