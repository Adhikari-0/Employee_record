import React, { useContext, useState } from 'react'
import '../cssComponent/SearchingName.css'
import employeeContext from '../context/employees/employeeContext'

const SearchingName = () => {
  const context = useContext(employeeContext);
  const { searchName, getEmployee } = context;

  const [searchNameField, setSearchNameField] = useState({firstName: ""})

  const handleReset = (e) => {
    e.preventDefault();
    setSearchNameField({ firstName: "" });
    getEmployee();
  }
  const onChange = (e) => {
    e.preventDefault();
    const search = ({firstName:e.target.value})
    setSearchNameField(search)
    searchName(search.firstName)

  }

  return (
    <div className='containerSearching'>
      <div className='container1ASearching'>
        <input placeholder='Search by name' name='firstName'
          value={searchNameField.firstName}
          onChange={onChange}
        />
      </div>
      <div className='container1ASearching'>
        <button onClick={handleReset}>Clear</button>
      </div>
    </div>
  )
}

export default SearchingName