const express=require("express")
const router=express.Router()
const userAuth =require("../middlewares/userAuth")
const {addPet,getPetsByUserId,updatePetDetails,getSinglepet,deletePet,getLostPetsNearby}=require("../controllers/petController")


router.post("/addPet",userAuth,addPet)
router.get("/userAllPets",userAuth,getPetsByUserId)
router.post("/pets/:petId",userAuth,updatePetDetails)
router.get("/singlePet/:petId",userAuth,getSinglepet)
router.post("/deletePet",userAuth,deletePet)
router.get("/lostPetNearBy",getLostPetsNearby)


module.exports=router