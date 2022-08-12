import React from 'react'
import '../cssComponent/Home.css'
import EmployeeForm from './EmployeeForm'
import SearchingName from './SearchingName'
import EmployeeDisplay from './EmployeeDisplay'
import EmployeeHeading from './EmployeeHeading'

const Home = () => {
  return (
    <div className='totalBox'>
      <div className='textFieldBx'>
        <div className='employeeHeading'>
          <EmployeeHeading />
        </div>
        <div className='employeeForm'>
          <EmployeeForm />
        </div>
        <div className='searchingName'>
          <SearchingName />
        </div>
        <div className='displayEmployeeHeading'>
          <h2>Employee Detail List</h2>
        </div>
      </div>
      <div className='employeeDetail'>
        <EmployeeDisplay />
      </div>
    </div>
  )
}

export default Home