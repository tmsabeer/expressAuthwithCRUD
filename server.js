const express = require("express");
const dotenv = require("dotenv").config();

const mongoose = require("mongoose")

const app = express();


const port = 8000;

app.use(express.json())

app.use("/api/contacts",require("./Routes/contactRoute"))
app.use("/api",require("./Routes/userRoute"))

app.get("/",(req, res)=>{
    res.send("<h1>Welcome to backend</h1>")
})


mongoose.connect(process.env.DB_STRING)
.then(()=> console.log(`DB connected successfully`))
.catch(()=> console.log("Failed to connect DB"))

app.listen(port, ()=> {
    console.log(`Server is running on PORT : ${port}`);
})
