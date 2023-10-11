const express = require("express")
const {getContacts, createContact, getSingleContact, updateContact, deleteContact} = require("../Controllers/contactController")
const validateToken = require("../Middlewares/validateTokenHandler")

const route = express.Router()

route.use(validateToken)

route.get("/",getContacts)
route.post("/create",createContact)
route.get("/:id",getSingleContact)
route.put("/update/:id",updateContact)
route.delete("/delete/:id",deleteContact)


module.exports = route