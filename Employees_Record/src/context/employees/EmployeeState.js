import React, { useState } from 'react'
import EmployeeContext from './employeeContext';

const EmployeeState = (props) => {

  const host = "http://localhost:5000";
  const employeesInitial = [];
  const [employees, setEmployees] = useState(employeesInitial);
  const [country, setCountry] = useState([])
  const [stateCountry, setStateCountry] = useState([])
  const [cityStateCountry, setCityStateCountry] = useState([])

  // Get all Employee
  const getEmployee = async () => {

    // To Fetch all the Employee detail
    const response = await fetch(`${host}/api/employees/fetchallemployee`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const json = await response.json()
    setEmployees(json)

    // To fetch all the country name in the select option list
    const responseCountry = await fetch(`${host}/api/employees/fetchcountry`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const countryJson = await responseCountry.json();
    setCountry(countryJson); 
  }

  // To fetch all the state name related to specific country
  const getCountryId = async (CountryId)=>{
    const responseState = await fetch(`${host}/api/employees/fetchstate`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({CountryId}),
    })
    const stateJson = await responseState.json();
    setStateCountry(stateJson);
  }

  const getCountryStateId = async (StateId)=>{
    const responseCity = await fetch(`${host}/api/employees/fetchcity`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({StateId}),
    })
    const cityJson = await responseCity.json();
    setCityStateCountry(cityJson);
  }

  // Add a Employee
  const addEmployee = async (firstName, lastName, dateOfBirth, emailId, gender, country, state, district, address, pinCode) => {

    const response = await fetch(`${host}/api/employees/addemployee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, dateOfBirth, emailId, gender, country, state, district, address, pinCode }),
    });
    const node = await response.json();
    setEmployees(employees.concat(node));
  }

  // Delete a Employee
  const deleteEmployee = async (id) => {

    await fetch(`${host}/api/employees/deleteemployee/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const newEmployee = employees.filter((node) => {
      return node._id !== id
    })
    setEmployees(newEmployee)
  }

  // Edit a Node
  const editEmployee = async (id, firstName, lastName, dateOfBirth, emailId, gender, country, state, district, address, pinCode) => {

      await fetch(`${host}/api/employees/updateemployee/${id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstName, lastName, dateOfBirth, emailId, gender, country, state, district, address, pinCode }),
      });

      let newEmployees = JSON.parse(JSON.stringify(employees))
      for (let index = 0; index < newEmployees.length; index++) {
          const element = newEmployees[index];
          if (element._id === id) {
              newEmployees[index].firstName = firstName;
              newEmployees[index].lastName = lastName;
              newEmployees[index].dateOfBirth = dateOfBirth;
              newEmployees[index].emailId = emailId;
              newEmployees[index].gender = gender;
              newEmployees[index].country = country;
              newEmployees[index].state = state;
              newEmployees[index].district = district;
              newEmployees[index].address = address;
              newEmployees[index].pinCode = pinCode;

              break;
          }
      }
      setEmployees(newEmployees);
  }

  // Get Searched Name
  const searchName = async (firstNamea) => {
    if(firstNamea=== undefined || firstNamea===""){
      getEmployee();
    }
    if(typeof firstNamea == "string"){
    const response = await fetch(`${host}/api/employees/searchingname`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstNamea }),
    });
    const json = await response.json()
    console.log(json)

    setEmployees(json)
  }
}

  return (
    <EmployeeContext.Provider value={{ employees, country, stateCountry, cityStateCountry, getEmployee, getCountryId, getCountryStateId, addEmployee, deleteEmployee,editEmployee,searchName }}>
      {props.children}
    </EmployeeContext.Provider>
  )
}

export default EmployeeState