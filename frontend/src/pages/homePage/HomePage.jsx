import React, { useState }  from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid'

import './HomePage.css'


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'stack', headerName: 'Stack', width: 130 },
  { field: 'dob', headerName: 'Date of Birth', width: 150 },
  { field: 'age', headerName: 'Age', width: 70 },
  { field: 'gender', headerName: 'Gender', width: 90 },
  { field: 'fatherName', headerName: 'Father Name', width: 150 },
  { field: 'fatherContact', headerName: 'Father Contact', width: 150 },
  { field: 'motherName', headerName: 'Mother Name', width: 150 },
  { field: 'studentContact', headerName: 'Student Contact', width: 150 },
  { field: 'studentEmail', headerName: 'Student Email', width: 150 },
  { field: 'guardianName', headerName: 'Guardian Name', width: 150 },
  { field: 'guardianContact', headerName: 'Guardian Contact', width: 150 },
  { field: 'relationshipWithGuardian', headerName: 'Relationship with Guardian', width: 200 },
  { field: 'address', headerName: 'Address', width: 200 },
  { field: 'village', headerName: 'Village', width: 150 },
  { field: 'taluk', headerName: 'Taluk', width: 150 },
  { field: 'educationalQualification', headerName: 'Educational Qualification', width: 200 },
  { field: 'schoolCollege', headerName: 'School/College', width: 150 },
  { field: 'workExperience', headerName: 'Work Experience', width: 150 },
  { field: 'companyName', headerName: 'Company Name', width: 150 },
  { field: 'designation', headerName: 'Designation', width: 150 },
  {
    field: 'options',
    headerName: 'Options',
    width: 150,
    renderCell: (params) => (
      <div className='optionBtn'>
        <button className='editBtn' onClick={() => handleEdit(params.row.id)}>Edit</button>
        <button className='deleteBtn' onClick={() => handleDelete(params.row.id)}>Block</button>
      </div>
    ),
  },
];

const rows = [
  { id: 1, name: 'John Doe', stack: 'MERN', dob: '1990-01-01', age: 32, gender: 'Male', fatherName: 'John Doe Sr.', fatherContact: '9876543210', motherName: 'Jane Doe', studentContact: '1234567890', studentEmail: 'john.doe@example.com', guardianName: 'Jane Doe', guardianContact: '9876543210', relationshipWithGuardian: 'Parent', address: '123 Main St', village: 'Sample Village', taluk: 'Sample Taluk', educationalQualification: 'B.E', schoolCollege: 'ABC School', workExperience: '3 years', companyName: 'XYZ Corp', designation: 'Software Engineer', options: 'Edit/Delete' },
  // Add more rows as needed
];





const HomePage = () => {
 


  return (
    <div className='homeMain'>
      <div className='tableMainDiv'>
      <HomeIcon style={{ marginRight: '0.5rem' }} />
        <h3>Home</h3>
      </div>
      <div className='tableDiv'>
        <div className="searchBar">
        <input type="text" placeholder="Search..." />
          <SearchIcon />
        </div>
        <div className="table">
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            autoHeight
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage
