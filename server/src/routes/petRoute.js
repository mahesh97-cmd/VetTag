const express=require("express")
const router=express.Router()
const userAuth =require("../middlewares/userAuth")
const {addPet}=require("../controllers/petController")


router.post("/addPet",userAuth,addPet)


module.exports=router