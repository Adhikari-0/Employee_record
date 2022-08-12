const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/employeedetails"

const connectToMongo = () =>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongoos successfully");
    })
}
module.exports = connectToMongo;