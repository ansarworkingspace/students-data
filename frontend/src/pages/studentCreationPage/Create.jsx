

import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import './Create.css';

const Create = () => {
  return (
    <div className='createPageMainDiv'>
      <div className='navigateDiv'>
        <Link to="/">
          <ArrowBackIcon style={{ marginRight: '0.5rem' }} />
          <h3>Home | Create</h3>
        </Link>
      </div>
      <div className='formBodyMain'>
        <h3>Create new student details</h3>
        <div className="one">
          <TextField
            label="Name"
            variant="outlined"
            margin="normal"
          />
         
          <FormControl className='stack' variant="outlined" margin="normal">
            <InputLabel>Stack</InputLabel>
            <Select label="Stack">
              <MenuItem value="MERN Stack">MERN Stack</MenuItem>
              <MenuItem value="MEAN Stack">MEAN Stack</MenuItem>
              <MenuItem value="Python">Python</MenuItem>
              <MenuItem value="Cyber Security">Cyber Security</MenuItem>
              <MenuItem value="Data Science">Data Science</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Date of Birth"
            type="date"
            variant="outlined"
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

            <TextField
            label="Age"
            variant="outlined"
            margin="normal"
            className='age'
            />


          <FormControl className='gender' variant="outlined" margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select label="Gender">
              <MenuItem  value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </div>


{/* Adding the second div with inputs */}
     <div className='two'>
          <TextField
            label='Father Name'
            variant='outlined'
            margin='normal'
            className='twoTextField'
          />
          <TextField
            label='Father Contact'
            variant='outlined'
            margin='normal'
            className='twoTextField'
          />
          <TextField
            label='Mother Name'
            variant='outlined'
            margin='normal'
            className='twoTextField'
          />
          <TextField
            label='Student Contact'
            variant='outlined'
            margin='normal'
            className='twoTextField'
          />
          <TextField
            label='Student Email '
            variant='outlined'
            margin='normal'
            className='twoTextField'
          />
        </div>


{/* Adding the second div with inputs */}
    <div className='three'>
        <div className='gardien'>
        <TextField
            label='Guardian Name'
            variant='outlined'
            margin='normal'
            className='thirdTextField'
          />
          <TextField
            label='Guardian Contact'
            variant='outlined'
            margin='normal'
            className='thirdTextField'
          /> 
          <TextField
            label='Relationship with Guardian'
            variant='outlined'
            margin='normal'
            className='thirdTextField'
          />

        </div>
        <div className='address'>
        <TextField
            label='Enter Address'
            variant='outlined'
            margin='normal'
            className='thirdTextFieldAdress'
          />
        <div className='localDetails'>
        <TextField
            label='Enter Village'
            variant='outlined'
            margin='normal'
            className='thirdTextFieldLocal'
          />
          <TextField
            label='Enter Taluk'
            variant='outlined'
            margin='normal'
            className='thirdTextFieldLocal'
          /> 
          

        </div>
        <div className='EduDetails'>
        <TextField
            label='Qualification'
            variant='outlined'
            margin='normal'
            className='thirdTextFieldEdu'
          />
          <TextField
            label='School/College'
            variant='outlined'
            margin='normal'
            className='thirdTextFieldEdu'
          /> 
          

        </div>


        </div>
     

        <div className='companyDetails'>
        <TextField
            label='Work Experience'
            variant='outlined'
            margin='normal'
            className='thirdTextFieldCompany'
          />
          <TextField
            label='Company Name'
            variant='outlined'
            margin='normal'
            className='thirdTextFieldCompany'
          /> 
          <TextField
            label='Designation '
            variant='outlined'
            margin='normal'
            className='thirdTextFieldCompany'
          />

        </div>
          
         
        </div>
         <div className='options'>
            <button className='cancelBtn'>Cancel</button>
            <button className='SumbitBtn'>Submit</button>
         </div>

      </div>
    </div>
  );
};

export default Create;
