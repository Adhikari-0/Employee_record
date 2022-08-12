import React, { useEffect, useContext, useState } from 'react'
import '../cssComponent/EmployeeDisplay.css';
import employeeContext from '../context/employees/employeeContext';
import editImage from '../imageAndComponent/editImage.png';
import deleteImage from '../imageAndComponent/deleteImage.png'
import EmployeeUpdate from './EmployeeUpdate';

const EmployeeDisplay = () => {
    const context = useContext(employeeContext);
    const { employees, getEmployee, deleteEmployee } = context;

    useEffect(() => {
        getEmployee()
        // eslint-disable-next-line
    }, []);

    const [openModal, setOpenModal] = useState(false);

    const [updateEmployee, setUpdateEmployee] = useState('');

    const deleteAlert = (name,lastName) => {
        alert("Deleted success\n" + name + " " + lastName);
    }

    return (
        <div className='tablecenter'>
            {openModal && <EmployeeUpdate closeModal={setOpenModal} updEmp={updateEmployee} />}

            <table style={{ width: '100%' }}>
                <tbody>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>BirthOfDate</th>
                        <th>Email ID</th>
                        <th>Gender</th>
                        <th>Country</th>
                        <th>State</th>
                        <th>District</th>
                        <th>Address</th>
                        <th>Pincode</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    {employees.map((node) => (
                        <tr key={node._id}>
                            <td>{node.firstName}</td>
                            <td>{node.lastName}</td>
                            <td>{node.dateOfBirth}</td>
                            <td>{node.emailId}</td>
                            <td>{node.gender}</td>
                            <th>{node.country}</th>
                            <th>{node.state}</th>
                            <th>{node.district}</th>
                            <td>{node.address}</td>
                            <td>{node.pinCode}</td>
                            <td><img src={editImage} alt='edit' height="20px" width="20px"
                                onClick={() => { setOpenModal(true); setUpdateEmployee(node)}} /></td>
                            <td><img src={deleteImage} alt='delete' height="20px" width="20px"
                                onClick={() => {
                                    deleteEmployee(node._id); deleteAlert(node.firstName,node.lastName);
                                }} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default EmployeeDisplay