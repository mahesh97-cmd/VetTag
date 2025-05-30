const express=require("express")
const router=express.Router()
const userAuth =require("../middlewares/userAuth")
const {addPet,getPetsByUserId,updatePetDetails,getSinglepet,deletePet,getLostPetsNearby,getPetByQrCodeId,markPetAsLost,addVaccination,markAsFound}=require("../controllers/petController")
const upload =require("../middlewares/multer")

router.post("/addPet",userAuth,upload.single("image"),addPet)
router.get("/userAllPets",userAuth,getPetsByUserId)
router.post("/pets/:petId",userAuth,updatePetDetails)
router.get("/singlePet/:petId",userAuth,getSinglepet)
router.post("/deletePet",userAuth,deletePet)
router.get("/lostPetNearBy",getLostPetsNearby)
router.get("/qr/:qrCodeId", getPetByQrCodeId);
router.post("/markAsLost",userAuth,markPetAsLost)
router.post("/pet/vaccination/:petId",userAuth,addVaccination)
router.post("/markAsFound",userAuth,markAsFound)


module.exports=router