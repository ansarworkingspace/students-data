import React, { useEffect, useState }   from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios';
import './HomePage.css'
import {toast} from 'react-toastify'



const HomePage = () => {
  const [rows, setRows] = useState([]);
  const [searchInput, setSearchInput] = useState('');

 


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 170 },
    { field: 'stack', headerName: 'Stack', width: 130 },
    { field: 'dob', headerName: 'Date of Birth', width: 150 },
    { field: 'age', headerName: 'Age', width: 70 },
    { field: 'gender', headerName: 'Gender', width: 90 },
    { field: 'fatherName', headerName: 'Father Name', width: 150 },
    { field: 'fatherContact', headerName: 'Father Contact', width: 150 },
    { field: 'motherName', headerName: 'Mother Name', width: 150 },
    { field: 'studentContact', headerName: 'Student Contact', width: 150 },
    { field: 'studentEmail', headerName: 'Student Email', width: 180 },
    { field: 'guardianName', headerName: 'Guardian Name', width: 150 },
    { field: 'guardianContact', headerName: 'Guardian Contact', width: 150 },
    { field: 'relationshipWithGuardian', headerName: 'Relationship with Guardian', width: 200 },
    { field: 'address', headerName: 'Address', width: 250 },
    { field: 'village', headerName: 'Village', width: 150 },
    { field: 'taluk', headerName: 'Taluk', width: 150 },
    { field: 'qualification', headerName: 'Qualification', width: 200 },
    { field: 'schoolCollege', headerName: 'School/College', width: 150 },
    { field: 'workExperience', headerName: 'Work Experience', width: 150 },
    { field: 'companyName', headerName: 'Company Name', width: 150 },
    { field: 'designation', headerName: 'Designation', width: 150 },
    {
      field: 'options',
      headerName: 'Options',
      width: 230,
      renderCell: (params) => (
        <div className='optionBtn'>
           <button
            className={params.row.status ? 'unblockBtn' : 'statusBtn'}
            onClick={() => handleStatusChange(params.row.id)}
          >
            {params.row.status ? 'Unblock' : 'Block'}
          </button>
          <button className='editBtn' onClick={() => handleEdit(params.row.id)}>
            Edit
          </button>
          <button className='deleteBtn' onClick={() => handleDelete(params.row.id)}>
            Delete
          </button>
        </div>
      ),
    },
  ];
  

const handleDelete = async (id)=>{
   try {
    const studentId = rows.find((row) => row.id === id)?._id;

    if (!studentId) {
      console.error('Student ID not found');
      return;
    }

    // Make an Axios request to your backend endpoint
    const response = await axios.delete('http://localhost:4000/api/admin/deleteData', { data: { studentId } });
    if (response.data.success) {
      toast.success(`status changed successfuly`)
      window.location.reload();
    } else {
      toast.error('Error changing status');
    }

   } catch (error) {
    toast.error('Error changing status');
   }
}




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/admin/getData');
        const updatedRows = response.data.map((row, index) => ({ ...row, id: index + 1 }));
        setRows(updatedRows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleSearch = () => {
    // Filter rows based on the search input
    const filteredRows = rows.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchInput.toLowerCase())
      )
    );
    setRows(filteredRows);
  };


  const handleStatusChange = async (id) => {
    try {
      // Retrieve the actual student ID from the rows using the provided id
      const studentId = rows.find((row) => row.id === id)?._id;
  
      // Check if the studentId is available
      if (!studentId) {
        console.error('Student ID not found');
        return;
      }
  
      // Make an Axios request to your backend endpoint
      const response = await axios.post('http://localhost:4000/api/admin/changeStatus', { studentId });
  
      // Check if the request was successful
      if (response.data.success) {
        // Update the status locally
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, status: !row.status } : row
          )
        );

        toast.success(`status changed successfuly`)
      } else {
        toast.error('Error changing status');
      }
    } catch (error) {
      // Handle errors
      toast.error('Error changing status');
    }
  };


  
  return (
    <div className='homeMain'>
      <div className='tableMainDiv'>
      <HomeIcon style={{ marginRight: '0.5rem' }} />
        <h3>Home</h3>
      </div>
      <div className='tableDiv'>
        <div className="searchBar">
        <input type="text" placeholder="Search..."  value={searchInput}  onChange={(e) => setSearchInput(e.target.value)}/>
          <SearchIcon onClick={handleSearch} />
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
