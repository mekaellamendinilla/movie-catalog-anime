const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

// GET ALL USERS
router.get(
    "/",
    authMiddleware,
    roleMiddleware("Admin"),
    userController.getUsers
);

// GET USER BY ID
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("Admin"),
    userController.getUserById
);

// UPDATE USER
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("Admin"),
    userController.updateUser
);

// UPDATE USER ROLE
router.put(
    "/:id/role",
    authMiddleware,
    roleMiddleware("Admin"),
    userController.updateUserRole
);

// DELETE USER
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("Admin"),
    userController.deleteUser
);

module.exports = router;