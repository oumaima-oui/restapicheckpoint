const express = require('express')
const app = express()
require("dotenv").config({ path: "./config/.env" })
const mongoose = require("mongoose")
const User = require("./models/User")


//Parse Data
app.use(express.json())


//Create Routes
//GET : RETURN ALL USERS
app.get("/api/users", (req, res) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(err => res.send(err))
})

//POST :  ADD A NEW USER TO THE DATABASE
app.post("/api/users", (req, res) => {
    const newUser = new User({ ...req.body })
    newUser.save()
        .then(user => res.status(200).json(user))
        .catch(err => console.log(err))
})

//PUT : EDIT A USER BY ID 
app.put("/api/users/:_id", (req, res) => {
    let { _id } = req.params
    User.findByIdAndUpdate({ _id }, { $set: { ...req.body } })
        .then(() => res.send("User has been updated"))
        .catch(err => res.send(err))
})

//DELETE : REMOVE A USER BY ID 
app.delete("/api/users/:_id", (req, res) => {
    let { _id } = req.params
    User.findByIdAndDelete({ _id })
        .then(() => res.send("User has been deleted"))
        .catch(err => res.send(err))
})


//Connect to the DB
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })  
      console.log("Data base connected");
    } catch (error) {
      console.log("Data base connection failed")
    }
  }

connectDB()


//Run the server
const PORT = process.env.PORT || process.env.port

console.log(PORT)

app.listen(PORT, (err) => {
    console.log(PORT)
    err
        ? console.log(err)
        : console.log(`The server is running on http://localhost:${PORT}`)
})