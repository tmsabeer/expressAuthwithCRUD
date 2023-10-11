const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required : [true, "Name is required"]
    },
    email: {
        type: String,
        required : [true, "Email is required"],
        unique : [true, "Email is already given"]
    },
    phone : {
        type : Number,
        require : [true, "Phone number is required"]
    }
}, {
    timestamps : true
})

const Contact = mongoose.model("Contact",contactSchema)

module.exports = Contact