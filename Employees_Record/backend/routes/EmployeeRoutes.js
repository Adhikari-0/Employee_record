const express = require('express');
const router = express.Router();
const EmployeeModels = require('../models/EmployeeModels');
const CountryModels = require('../models/CountryModels');
const StateModels = require('../models/StateModels');
const CityModels = require('../models/CityModels');
const { body, validationResult } = require('express-validator')
const { set } = require('mongoose');

//ROUTE 1: Add a new employee using: POST
router.post('/addemployee', [
  body('firstName', 'Please enter the title').isLength({ min: 3 }),
  body('lastName', 'Description muse be atleast 5 character').isLength({ min: 3 }),
  body('emailId', 'Enter a valid email' ).isEmail(),
], async (req, res) => {

  const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }

  const { firstName, lastName, dateOfBirth, emailId, gender, country, state, district, address, pinCode } = req.body;
  try {
    //if there are errors, reutrn bad request and the error
    const employee = new EmployeeModels({
      firstName, lastName, dateOfBirth, emailId, gender, country, state, district, address, pinCode
    })
    const saveEmployees = await employee.save();
    res.json(saveEmployees);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
})

//ROUTE 2: Get all the nodes using: GET
router.get("/fetchallemployee", async (req, res) => {
  try {
    const employees = await EmployeeModels.find(req);
    res.json(employees);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

//ROUTE 3: Update existing  Employee using: PUT
router.put("/updateemployee/:id", async (req, res) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    emailId,
    gender,
    country,
    state,
    district,
    address,
    pinCode,
  } = req.body;
  try {
    const newEmployee = {};
    if (firstName) {
      newEmployee.firstName = firstName;
    }
    if (lastName) {
      newEmployee.lastName = lastName;
    }
    if (dateOfBirth) {
      newEmployee.dateOfBirth = dateOfBirth;
    }
    if (emailId) {
      newEmployee.emailId = emailId;
    }
    if (gender) {
      newEmployee.gender = gender;
    }
    if (country) {
      newEmployee.country = country;
    }
    if (state) {
      newEmployee.state = state;
    }
    if (district) {
      newEmployee.district = district;
    }
    if (address) {
      newEmployee.address = address;
    }
    if (pinCode) {
      newEmployee.pinCode = pinCode;
    }

    //Find the employee to be updated and update it
    let employee = await EmployeeModels.findById(req.params.id);
    if (!employee) {
      return res.status(404).send("Not Found");
    }

    employee = await EmployeeModels.findByIdAndUpdate(
      req.params.id,
      { $set: newEmployee },
      { new: true }
    );
    res.json(employee);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

//ROUTE 4: Delete an existing  employee using: DELETE
router.delete("/deleteemployee/:id", async (req, res) => {
  try {
    //Find the Employee to be updated and update it
    let employee = await EmployeeModels.findById(req.params.id);
    if (!employee) {
      return res.status(404).send("Not Found");
    }

    employee = await EmployeeModels.findByIdAndDelete(req.params.id);
    res.json({ Success: "Node has been deleted", employee: employee });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// ROUTE 5: Searching data from database using: POST
router.post("/searchingname", async (req, res) => {
  const { firstNamea } = req.body;
  if (Boolean(firstNamea)==true) {
    try{
      const employees = await EmployeeModels.find({ firstName: { $regex: firstNamea, $options : "i" } });
      res.json(employees);
    } catch(error){
      res.status(500).send(error);
    }   
  }
});

// To fetch all the country
router.get("/fetchcountry", async (req, res) => {
  try {
    const employees = await CountryModels.find(req);
    res.json(employees);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
})

// To fetch all the state related to Specific Country
router.post("/fetchstate", async (req, res) => {
  const { CountryId } = req.body;

  if (CountryId == null || CountryId == "") {
    return res.status(404).send("Please select a country");
  }
  try {
    const stateColl = await StateModels.find({ country_id: { $in: CountryId } });
    res.json(stateColl)
  } catch (error) {
    res.status(500).send("Internal server error");
  }

})

// To fetch all the City related to specific State
router.post("/fetchcity", async (req, res) => {
  const { StateId } = req.body;

  if (StateId == null || StateId == "") {
    return res.status(404).send("Please select a country");
  }
  try {
    const stateColl = await CityModels.find({ state_id: { $in: StateId } });
    res.json(stateColl)
  } catch (error) {
    res.status(500).send("Internal server error");
  }

})


module.exports = router;