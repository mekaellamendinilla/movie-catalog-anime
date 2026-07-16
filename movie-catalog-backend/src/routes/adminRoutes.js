const express=require("express");

const router=express.Router();

const adminController=require("../controllers/adminController");

const authMiddleware=require("../middleware/authMiddleware");

const roleMiddleware=require("../middleware/roleMiddleware");

router.get(

"/profile",

authMiddleware,

roleMiddleware("Admin"),

adminController.getProfile

);

router.put(

"/profile",

authMiddleware,

roleMiddleware("Admin"),

adminController.updateProfile

);

module.exports=router;