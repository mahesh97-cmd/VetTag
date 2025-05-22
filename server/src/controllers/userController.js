const User=require("../models/userModel")



const userProfile=async(req,res)=>{
 try {
    const userId=req.user.id;
    const user=await User.findById(userId).select("-password")
    if(!user){
       return res.status(404).json({message:"user not found"})
    }
    res.status(200).json(user)

 } catch (error) {
    res.status(500).json({ message: "Server error" });
 }
}

const profileUpdate=async(req,res)=>{
try {
    
    const {name,phone,address}=req.body
    const userId=req.user.id
    const user=await User.findByIdAndUpdate(userId,{name,phone,address},{new:true}).select("-password")

    return res.status(200).json({message:"User Updated Successfully",user})

} catch (error) {
      return  res.status(500).json({ message: "Update failed" });
}
}



module.exports={userProfile,profileUpdate}