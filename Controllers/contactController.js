const Contact = require("../Models/contactModel")


const getContacts = async(req,res) => {
    try{
        const contacts =await  Contact.find({user_id : req.user.id})
        res.status(200).json(contacts)
    } catch(err) {
        res.status(400).json({message : "Could not get contacts"})
    }
}


const getSingleContact = async(req,res)=>{
    try{
        const contact =await  Contact.findById(req.params.id)
        if(!req.params.id) {
            res.status(404).json({message: `Contact with id ${req.params.id} is not found`})
        }
        if(contact.user_id.toString() !== req.user.id) {
            res.status(404).json({message: `User don't have permission to view this contact`})
        }
        res.status(200).json(contact)
    } catch(err) {
        res.status(400).json({message : "Could not get contact"})
    }
}

const createContact = async(req,res)=>{
    try{
        const contacts =await  Contact.create({
            user_id: req.user.id,
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone,
        })
        res.status(201).json(contacts)
    } catch(err) {
        res.status(400).json({message : "Could not create contacts"})
    }
}

const updateContact = async(req,res)=>{
    try{
        const contact =await Contact.findById(req.params.id)
        if(!contact) {
            res.status(404).json({message: `Contact with id ${req.params.id} is not found`})
        }

        if(contact.user_id.toString() !== req.user.id) {
            res.status(404).json({message: `User don't have permission to update this contact`})
        }

        const updateContact = await Contact.findByIdAndUpdate(req.params.id, req.body,{new:true})
        res.status(200).json(updateContact)
    } catch(err) {
        res.status(400).json({message : "Could not update contacts"})
    }
}


const deleteContact = async(req,res)=>{
    try{
       
        const contact =await Contact.findById(req.params.id)
        if(!contact) {
            res.status(404).json({message: `Contact with id ${req.params.id} is not found`})
        }

        if(contact.user_id.toString() !== req.user.id) {
            res.status(404).json({message: `User don't have permission to delete this contact`})
        }

       const deleteContact = await Contact.findByIdAndDelete(req.params.id)
        
        res.status(200).json({Message:`${deleteContact.name} with ${deleteContact._id } is deleted`})
    } catch(err) {
        res.status(400).json({message : "Could not delete contacts"})
    }
}


module.exports = {getContacts, createContact, getSingleContact, updateContact, deleteContact }
