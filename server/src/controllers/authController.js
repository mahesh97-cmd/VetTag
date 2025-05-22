const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken")

const registerUser = async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "user is already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashPassword,
      name,
      phone,
    });

    await user.save();
    res.status(201).json({ message: "user Register successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


const loginUser=async(req,res)=>{
try {
    const {email,password}=req.body

    const user=await User.findOne({email})
    if(!user){
        res.status(404).json({message:"user not found"})
    }

    const isMatched=await bcrypt.compare(password,user.password)
    if(!isMatched){
        res.status(401).json({message:"invalid creditials"})
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})

     res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
        message:"Login Successful"
    })

} catch (error) {
        res.status(500).json({ message: "Server Error" });
}
}

const logoutUser=async(req,res)=>{
   res.clearCookie("token")
  res.status(200).json({ message: "Logged out successfully" });
}



module.exports={registerUser,loginUser,loginUser}