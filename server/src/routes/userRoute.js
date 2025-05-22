const express=require("express")
const router=express.Router()
const userAuth=require("../middlewares/userAuth")
const {userProfile,profileUpdate}=require("../controllers/userController")


router.get("/user-profile",userAuth,userProfile)
router.post("/user-editProfile",userAuth,profileUpdate)



module.exports=router