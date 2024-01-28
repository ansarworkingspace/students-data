// validation.js
import * as Yup from 'yup';

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
    relationshipWithGuardian: Yup.string().required('Relationship with Guardian is required'),
    guardianContact: Yup.string().required('Guardian Contact is required'),
    address: Yup.string().required('Address is required'),
    village: Yup.string().required('Village is required'),
    taluk: Yup.string().required('Taluk is required'),
    qualification: Yup.string().required('Qualification is required'),
    schoolCollege: Yup.string().required('School/College is required'),

    workExperience: Yup.number().required('Work Experience is required'),
    companyName: Yup.string().required('Company Name is required'),
    designation: Yup.string().required('Designation is required'),
    
      
      


});

const validateData = async (data) => {
    try {
        await validationSchema.validate(data, { abortEarly: false });
        return null; // No validation errors
    } catch (error) {
        const validationErrors = {};
        error.inner.forEach((err) => {
            validationErrors[err.path] = err.message;
        });
        return validationErrors;
    }
};

export default validateData;
