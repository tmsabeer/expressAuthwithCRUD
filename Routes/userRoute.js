const express = require("express")

const { registerUser, loginUser, currentUser } = require("../Controllers/userController");
const validateToken = require("../Middlewares/validateTokenHandler");

const route = express.Router();

route.post("/register",registerUser)
route.post("/login",loginUser)
route.get("/currentUser", validateToken, currentUser)


module.exports = route