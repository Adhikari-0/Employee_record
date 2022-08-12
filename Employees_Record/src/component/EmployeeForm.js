import React, { useState, useContext } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../cssComponent/EmployeeForm.css'
import employeeContext from '../context/employees/employeeContext'

const EmployeeForm = () => {

    const context = useContext(employeeContext);
    const { addEmployee, country, stateCountry, cityStateCountry, getCountryId, getCountryStateId } = context;

    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        emailId: "",
        gender: "",
        address: "",
        pinCode: "",
    });

    //For Date Picker
    const [startDate, setStartDate] = useState(new Date());

    // Setting name of the Country in database
    const [countryName, setCountryName] = useState('');
    // Setting name of the State in database
    const [stateName, setStateName] = useState('');
    // Setting name of the City in database
    const [cityName, setCityName] = useState('');

    // Reseting the input field using handleReset button
    const handleReset = (e) => {
        e.preventDefault();
        setEmployee({
            firstName: "",
            lastName: "",
            emailId: "",
            gender: "",
            address: "",
            pinCode: "",
        });
        setStartDate(new Date());
    };
    //Adding employee detail in the server using handleSubmit button 
    const handleSubmit = (e) => {
        e.preventDefault();
        addEmployee(
            employee.firstName,
            employee.lastName,
            startDate.toLocaleDateString(),
            employee.emailId,
            employee.gender,
            countryName,
            stateName,
            cityName,
            employee.address,
            employee.pinCode
        );
    };
    // Function to set the value of employee detail from input field to button handler
    const onChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };
    // To select State using Country_Id of specific country
    const handleCountry = (event) => {
        const getCountryid = event.target.value;
        const nameArr = getCountryid.split(',');
            getCountryId(nameArr[0]);
            setCountryName(nameArr[1]);
    }
    // To select City using State_Id of Specific country of specific state
    const handleState = (event) => {
        const getStateid = event.target.value;
        const nameArr = getStateid.split(',');
            getCountryStateId(nameArr[0]);
            setStateName(nameArr[1]);
    }

    const handleCity = (event) => {
        const getCityName = event.target.value;
            setCityName(getCityName);

    }
    return (
        <div className='container'>
            <div className='container1'>
                <div className='container1A'>
                    <input placeholder='First Name' size='15' type='text' name='firstName' value={employee.firstName} onChange={onChange} />
                </div>
                <div className='container1A'>
                    <input placeholder='Last Name' size='15' type='text' name='lastName' value={employee.lastName} onChange={onChange} />
                </div>
                <div className='container1A'>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} maxDate={new Date()} />
                </div>
                <div className='container1A'>
                    <input placeholder='Email ID' size='15' type='email' name='emailId' value={employee.emailId} onChange={onChange} />
                </div>
                <div className='container1B'>
                    <label>Gender</label>
                    <input type="radio" name='gender' value='Male' checked={employee.gender === 'Male'} onChange={onChange} />
                    <label>Male</label>
                    <input type="radio" name='gender' value='Female' checked={employee.gender === 'Female'} onChange={onChange} />
                    <label>Female</label>
                </div>
            </div>
            <div className='container1'>
                <div className='container1A'>
                    <select className='selectOption' onChange={(e) => handleCountry(e)} required>
                        <option>--Select Country--</option>
                        {country.map((countryget) => (
                            <option key={countryget.country_id} name='country' value={[countryget.country_id, countryget.country_name]}>{countryget.country_name}</option>
                        ))}
                    </select>
                </div>
                <div className='container1A'>
                    <select className='selectOption' onChange={(e) => handleState(e)}>
                        <option>--Select State--</option>
                        {stateCountry.map((stateget) => (
                            <option key={stateget.state_id} name='state' value={[stateget.state_id, stateget.state_name]}>{stateget.state_name}</option>
                        ))}
                    </select>
                </div>
                <div className='container1A'>
                    <select className='selectOption' onChange={(e) => handleCity(e)}>
                        <option>--Select City--</option>
                        {cityStateCountry.map((cityget) => (
                            <option key={cityget.city_id} name="city" value={cityget.city_name}>{cityget.city_name}</option>
                        ))}
                    </select>
                </div>
                <div className='container1A'>
                    <input placeholder='Address' size='15' name='address' value={employee.address} onChange={onChange} />
                </div>
                <div className='container1A'>
                    <input placeholder='Pincode' size='15' name='pinCode' value={employee.pinCode} onChange={onChange} />
                </div>
            </div>
            <div className='buttonContainer'>
                <button className='buttonClass' onClick={handleReset}>Reset</button>
                <button className='buttonClass' onClick={handleSubmit}>Submit</button>
            </div>

        </div>
    );
}

export default EmployeeForm