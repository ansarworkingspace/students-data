
import React,{useState,useEffect} from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import {toast} from 'react-toastify'
import * as Yup from 'yup';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import './Edit.css';
import axios from 'axios'; 

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    stack: Yup.string().required('Stack is required'),
    dob: Yup.date().required('Date of Birth is required'),
    age: Yup.number().required('Age is required').positive('Age must be positive'),
    gender: Yup.string().required('Gender is required'),
    fatherName: Yup.string().required('Father Name is required'),
    fatherContact: Yup.string().required('Father Contact is required'),
    motherName: Yup.string().required('Mother Name is required'),
    studentContact: Yup.string().required('Student Contact is required'),
    studentEmail: Yup.string().email('Invalid email').required('Student Email is required'),
    guardianName: Yup.string().required('Guardian Name is required'),
    guardianContact: Yup.string().required('Guardian Contact is required'),
    relationshipWithGuardian: Yup.string().required('Relationship with Guardian is required'),
    address: Yup.string().required('Address is required'),
    village: Yup.string().required('Village is required'),
    taluk: Yup.string().required('Taluk is required'),
    qualification: Yup.string().required('Qualification is required'),
    schoolCollege: Yup.string().required('School/College is required'),
    workExperience: Yup.number().required('Work Experience is required'),
    companyName: Yup.string().required('Company Name is required'),
    designation: Yup.string().required('Designation is required'),
    
      

  });
  
  




const Edit = ({ studentId, onCancel }) => {

  const [studentData, setStudentData] = useState(null);
  const [isVisible, setIsVisible] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Before API request - studentId:', studentId);
        const response = await axios.get(`http://localhost:4000/api/admin/getOneStudentData/${studentId}`);
        console.log('After API request - response.data:', response.data);

        setStudentData(response.data); // Store the fetched student data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [studentId]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Make an Axios request to update the student data on the server
      const response = await axios.put(`http://localhost:4000/api/admin/updateStudentData/${studentId}`, values);


      if (response.data.success) {
        toast.success('Student data updated successfully');
        handleCancel()
      } else {
        toast.error('Error updating student data');
      }
    } catch (error) {
      toast.error('Error updating student data');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
  
    onCancel(); // Call onCancel function passed as a prop
  };

  return (
    < div className='editForm'>
     {isVisible && studentData && (
        <Formik
        initialValues={{
          name: studentData.data.name || '',
          stack: studentData.data.stack || '',
          dob: studentData.data.dob || '',
          age: studentData.data.age || '',
          gender: studentData.data.gender || '',
          fatherName: studentData.data.fatherName || '',
          fatherContact: studentData.data.fatherContact || '',
          motherName: studentData.data.motherName || '',
          studentContact: studentData.data.studentContact || '',
          studentEmail: studentData.data.studentEmail || '',
          guardianName: studentData.data.guardianName || '',
          guardianContact: studentData.data.guardianContact || '',
          relationshipWithGuardian: studentData.data.relationshipWithGuardian || '',
          address: studentData.data.address || '',
          village: studentData.data.village || '',
          taluk: studentData.data.taluk || '',
          qualification: studentData.data.qualification || '',
          schoolCollege: studentData.data.schoolCollege || '',
          workExperience: studentData.data.workExperience || '',
          companyName: studentData.data.companyName || '',
          designation: studentData.data.designation || '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className='formBodyMain'>
          <h3>Edit student details</h3>




          <div className="one">
          <Field
              as={TextField}
              name="name"
              label="Name"
              variant="outlined"
              margin="normal"
              helperText={<ErrorMessage name="name" component="div" className="error" />}
            />
            
            <FormControl className='stack' variant="outlined" margin="normal" >
             <InputLabel>Stack</InputLabel>
          <Field
          as={Select}
          label="Stack"
         name="stack"
          
       >
      <MenuItem value="MERN Stack">MERN Stack</MenuItem>
      <MenuItem value="MEAN Stack">MEAN Stack</MenuItem>
      <MenuItem value="Python">Python</MenuItem>
      <MenuItem value="Cyber Security">Cyber Security</MenuItem>
      <MenuItem value="Data Science">Data Science</MenuItem>
    </Field>
  </FormControl>



            <Field
              as={TextField}
              name="dob"
              label="Date of Birth"
              type="date"
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              helperText={<ErrorMessage name="dob" component="div" className="error" />}
            />

            <Field
              as={TextField}
              name="age"
              label="Age"
              variant="outlined"
              margin="normal"
              className='age'
              helperText={<ErrorMessage name="age" component="div" className="error" />}
            />

            <FormControl className='gender' variant="outlined" margin="normal"  helperText={<ErrorMessage name="gender" component="div" className="error" />}>
              <InputLabel>Gender</InputLabel>
              <Field as={Select} label="Gender" name="gender">
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Field>
            </FormControl>
            
          </div>

          <div className='two'>
  <Field
    as={TextField}
    name="fatherName"
    label='Father Name'
    variant='outlined'
    margin='normal'
    className='twoTextField'
    helperText={<ErrorMessage name="fatherName" component="div" className="error" />}
  />
  
  <Field
    as={TextField}
    name="fatherContact"
    label='Father Contact'
    variant='outlined'
    margin='normal'
    className='twoTextField'
    helperText={<ErrorMessage name="fatherContact" component="div" className="error" />}
  />
  <Field
    as={TextField}
    name="motherName"
    label='Mother Name'
    variant='outlined'
    margin='normal'
    className='twoTextField'
    helperText={<ErrorMessage name="motherName" component="div" className="error" />}
  />
  <Field
    as={TextField}
    name="studentContact"
    label='Student Contact'
    variant='outlined'
    margin='normal'
    className='twoTextField'
    helperText={<ErrorMessage name="studentContact" component="div" className="error" />}
  />
  <Field
    as={TextField}
    name="studentEmail"
    label='Student Email'
    variant='outlined'
    margin='normal'
    className='twoTextField'
    helperText={<ErrorMessage name="studentEmail" component="div" className="error" />}
  />
</div>
<div className='three'>
  <div className='gardien'>
    <Field
      as={TextField}
      name="guardianName"
      label='Guardian Name'
      variant='outlined'
      margin='normal'
      className='thirdTextField'
      helperText={<ErrorMessage name="guardianName" component="div" className="error" />}
    />
    <Field
      as={TextField}
      name="guardianContact"
      label='Guardian Contact'
      variant='outlined'
      margin='normal'
      className='thirdTextField'
      helperText={<ErrorMessage name="guardianContact" component="div" className="error" />}
    />
    <Field
      as={TextField}
      name="relationshipWithGuardian"
      label='Relationship with Guardian'
      variant='outlined'
      margin='normal'
      className='thirdTextField'
      helperText={<ErrorMessage name="relationshipWithGuardian" component="div" className="error" />}
    />
  </div>
  <div className='address'>
    <Field
      as={TextField}
      name="address"
      label='Enter Address'
      variant='outlined'
      margin='normal'
      className='thirdTextFieldAdress'
      helperText={<ErrorMessage name="address" component="div" className="error" />}
    />
    <div className='localDetails'>
      <Field
        as={TextField}
        name="village"
        label='Enter Village'
        variant='outlined'
        margin='normal'
        className='thirdTextFieldLocal'
        helperText={<ErrorMessage name="village" component="div" className="error" />}
      />
      <Field
        as={TextField}
        name="taluk"
        label='Enter Taluk'
        variant='outlined'
        margin='normal'
        className='thirdTextFieldLocal'
        helperText={<ErrorMessage name="taluk" component="div" className="error" />}
      />
    </div>
    <div className='EduDetails'>
      <Field
        as={TextField}
        name="qualification"
        label='Qualification'
        variant='outlined'
        margin='normal'
        className='thirdTextFieldEdu'
        helperText={<ErrorMessage name="qualification" component="div" className="error" />}
      />
      <Field
        as={TextField}
        name="schoolCollege"
        label='School/College'
        variant='outlined'
        margin='normal'
        className='thirdTextFieldEdu'
        helperText={<ErrorMessage name="schoolCollege" component="div" className="error" />}
      />
    </div>
  </div>

  <div className='companyDetails'>
    <Field
      as={TextField}
      name="workExperience"
      label='Work Experience'
      variant='outlined'
      margin='normal'
      className='thirdTextFieldCompany'
      helperText={<ErrorMessage name="workExperience" component="div" className="error" />}
    />
    <Field
      as={TextField}
      name="companyName"
      label='Company Name'
      variant='outlined'
      margin='normal'
      className='thirdTextFieldCompany'
      helperText={<ErrorMessage name="companyName" component="div" className="error" />}
    />
    <Field
      as={TextField}
      name="designation"
      label='Designation'
      variant='outlined'
      margin='normal'
      className='thirdTextFieldCompany'
      helperText={<ErrorMessage name="designation" component="div" className="error" />}
    />
  </div>
</div>



          <div className='options'>
            <button onClick={handleCancel} type='button' className='cancelBtn'>
              Cancel
            </button>
            <button type='submit' className='SumbitBtn'>
              Submit
            </button>
          </div>
        </Form>
      </Formik>


   )}

    </div>
  );
};

export default Edit;
