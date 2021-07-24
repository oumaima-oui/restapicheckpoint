const mongoose = require("mongoose")
const schema = mongoose.Schema

const user = new schema({
    name : {type : String, required:true},
    age : Number,
    phone_number : Number
})

module.exports = User = mongoose.model("user", user)
