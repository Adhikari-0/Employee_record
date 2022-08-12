import React, { useContext, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../cssComponent/EmployeeUpdate.css';
import employeeContext from '../context/employees/employeeContext';

function EmployeeUpdate({ closeModal, updEmp }) {
    const context = useContext(employeeContext);
    const { editEmployee, country, stateCountry, cityStateCountry, getCountryId, getCountryStateId } = context;

    const [employee, setEmployee] = useState({
        id: updEmp._id,
        efirstName: updEmp.firstName,
        elastName: updEmp.lastName,
        edateOfBirth: updEmp.dateOfBirth,
        eemailId: updEmp.emailId,
        egender: updEmp.gender,
        ecountry: updEmp.country,
        estate: updEmp.state,
        edistrict: updEmp.district,
        eaddress: updEmp.address,
        epinCode: updEmp.pinCode
    })

    //For Date Picker
    const [startDate, setStartDate] = useState(new Date(employee.edateOfBirth));
    // console.log(startDate.toLocaleDateString());

    // Setting name of the Country in database
    const [countryName, setCountryName] = useState(employee.ecountry);
    // Setting name of the State in database
    const [stateName, setStateName] = useState(employee.estate);
    // Setting name of the City in database
    const [cityName, setCityName] = useState(employee.edistrict);

    const handleClickUpdate = (e) => {
        e.preventDefault();
        editEmployee(employee.id,
            employee.efirstName,
            employee.elastName,
            startDate.toLocaleDateString(),
            employee.eemailId,
            employee.egender,
            countryName,
            stateName,
            cityName,
            employee.eaddress,
            employee.epinCode
        )
         alert("Updated success\n" + employee.efirstName+ " " + employee.elastName);
    }

    const onChange = (e) => {
        e.preventDefault();
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    }

    const handleCountry = (event) => {
        const getCountryDetail = event.target.value;
        const nameArr = getCountryDetail.split(',');
        getCountryId(nameArr[0]);
        setCountryName(nameArr[1]);
    }

    const handleState = (event) => {
        const getStateDetail = event.target.value;
        const nameArr = getStateDetail.split(',');
        getCountryStateId(nameArr[0]);
        setStateName(nameArr[1]);
    }

    const handleCity = (event) => {
        const getCityDetail = event.target.value;
        setCityName(getCityDetail);
    }
    return (
        <div className='modal' style={{ display: 'block' }}>
            <div className='modal-content' >
                <h1>Update Employee</h1>
                <div className='container1'>
                    <div className='container1A'>
                        <input placeholder='First Name' size='15' type='text' name='efirstName' value={employee.efirstName} onChange={onChange} />
                    </div>
                    <div className='container1A'>
                        <input placeholder='Last Name' size='15' type='text' name='elastName' value={employee.elastName} onChange={onChange} />
                    </div>
                    <div className='container1A'>
                        {/* <input placeholder='Date Of Birth' size='15' type='date' name='edateOfBirth' value={employee.edateOfBirth} onChange={onChange} /> */}
                        {/* <DatePicker placeholderText="MM/DD/YYYY" selected={startDate} value={employee.edateOfBirth} onChange={onChange} maxDate={new Date()} /> */}
                        <DatePicker selected={startDate} name='edateOfBirth' onChange={(date) => setStartDate(date)} maxDate={new Date()} />
                    </div>
                    <div className='container1A'>
                        <input placeholder='Email ID' size='15' type='email' name='eemailId' value={employee.eemailId} onChange={onChange} />
                    </div>
                    <div className='container1B'>
                        <label>Gender</label>
                        <input type="radio" name='egender' checked={employee.egender === "Male"} value="Male" onChange={onChange} />
                        <label>Male</label>
                        <input type="radio" name='egender' checked={employee.egender === "Female"} value="Female" onChange={onChange} />
                        <label>Female</label>
                    </div>
                </div>
                <div className='container1'>
                    <div className='container1A'>
                        <select className='selectOption' onChange={(e) => handleCountry(e)}>
                            <option>{employee.ecountry}</option>
                            {country.map((countryget) => (
                                <option key={countryget.country_id} name='country' value={[countryget.country_id, countryget.country_name]}>{countryget.country_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='container1A'>
                        <select className='selectOption' onChange={(e) => handleState(e)}>
                            <option>{employee.estate}</option>
                            {stateCountry.map((stateget) => (
                                <option key={stateget.state_id} name='state' value={[stateget.state_id, stateget.state_name]}>{stateget.state_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='container1A'>
                        <select className='selectOption' onChange={(e) => handleCity(e)}>
                            <option>{employee.edistrict}</option>
                            {cityStateCountry.map((cityget) => (
                                <option key={cityget.city_id} name="city" value={cityget.city_name}>{cityget.city_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='container1A'>
                        <input placeholder='Address' size='15' name='eaddress' value={employee.eaddress} onChange={onChange} />
                    </div>
                    <div className='container1A'>
                        <input placeholder='Pincode' size='15' name='epinCode' value={employee.epinCode} onChange={onChange} />
                    </div>
                </div>
                <div className='buttonContainer'>
                    <button className='buttonClass' onClick={() => closeModal(false)} >Close</button>
                    <button className='buttonClass' onClick={handleClickUpdate}>Update</button>
                </div>

            </div>
        </div>
    )
}

export default EmployeeUpdate