const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb");
dotenv.config();

app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("home Page");
});
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


