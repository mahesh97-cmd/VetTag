const express=require("express")
const router=express.Router()
const {registerUser,loginUser,logout}=require("../controllers/authController")


router.post("/auth/register",registerUser)
router.post("/auth/login",loginUser)


module.exports=router