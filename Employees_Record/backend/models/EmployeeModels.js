const mongoose = require("mongoose");


const EmployeeSchema = new mongoose.Schema({
  
    firstName :{
        type:String,

    },
    lastName :{
        type:String,
    },
    dateOfBirth:{
        type:String,
    },
    emailId:{
        type:String,
    },
    gender:{
        type:String,
    },
    country:{
        type:String,
    },
    state:{
        type:String,
    },
    district:{
        type:String,
    },
    address:{
        type:String,
    },
    pinCode:{
        type:Number,
    },
    date:{
        type:Date,
        default:Date.now
    }
  });

  const employee = mongoose.model("employee",EmployeeSchema);

module.exports = employee