const User = require("../Models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = async(req,res) =>{
    try {
        const {username, email, password} = req.body;

        if(!username || !email || !password) {
            res.status(400).json({message: "All fields are mandatory"})
        }

        const userAvailable = await User.findOne({email})
        if(userAvailable) {
            res.status(400).json({message: "Email already registered"})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            username, 
            email,
            password : hashedPassword
        })

        if(newUser){
            res.status(201).json({message: "User registered successfully!"})
        } else {
            res.status(201).json({message: "user data not valid"})
        }
        
    } catch(err) {
        res.status(200).json({message: err.message})
    }
}



const loginUser = async(req,res) =>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        if(!email || !password) {
            res.status(400).json({message: "All fields are mandatory"})
        }

        const user = await User.findOne({email})
        const comparePassword = await bcrypt.compare(password, user.password)

        if(user && comparePassword) {
            const accessToken = jwt.sign({
                user : {
                    id: user.id,
                    username: user.username,
                    email :user.email
                }
            }, process.env.ACCESS_TOKEN_SECRET, {expiresIn : "30m"})
            res.status(200).json({
                id: user.id,
                username: user.username,
                email :user.email,
                accessToken
            })
        }


    } catch(err) {
        res.status(200).json({message: "Invalid credentials"})
    }
}

const currentUser = async(req,res) =>{
    try {
        res.status(200).json(req.user)
    } catch(err) {
        res.status(200).json({message: err.message})
    }
}


module.exports = { registerUser, loginUser, currentUser }
