const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb");
const cookieParser=require("cookie-parser")
const cors=require("cors")
const authRoute=require("./routes/authRoute")
const userRoute=require("./routes/userRoute")
const petRoute=require("./routes/petRoute")
dotenv.config();

app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:"",
    credentials:true
}))
app.get("/", (req, res) => {
  res.send("home Page");
});

//routes->>>>

app.use("/api",authRoute)
app.use("/api",userRoute)
app.use("/api",petRoute)




PORT = process.env.PORT || 3007;

connectDb().then(() => {
  app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
})
.catch((error)=>{
console.error(' MongoDB connection failed:', error.message);
    process.exit(1);
})


