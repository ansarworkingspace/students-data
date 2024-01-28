import asyncHandler from 'express-async-handler';
import admin from '../schema/adminBasicModel.js';
import generateAdminToken from '../utils/generateToken.js'
import PersonalInfo from '../schema/studentFormModel.js'
import validateData from '../utils/validation.js'

const adminAuth = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const foundAdmin = await admin.findOne({ email }); 

    if (foundAdmin && (await foundAdmin.matchPassword(password))) {
      generateAdminToken(res, foundAdmin._id);
        res.status(201).json({
            _id: foundAdmin._id,
            name: foundAdmin.name,
            email: foundAdmin.email
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


const adminRegister = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const adminExists = await admin.findOne({ email: email })

    if (adminExists) {
        res.status(400)
        throw new Error('Admin already exists');
    }

    const newAdmin = await admin.create({
        name,
        email,
        password
    });

    if (newAdmin) {
      generateAdminToken(res, newAdmin._id)
        res.status(201).json({
            _id: newAdmin._id,
            name: newAdmin.name,
            email: newAdmin.email
        });
    } else {
        res.status(400)
        throw new Error('Invalid admin data');
    }
});


const adminLogout = (req, res) => {
    res.cookie('adminJwt','',{
        httpOnly:true,
        expires:new Date(0)
       })
       
       
    res.status(200).json({message:'admin logged out'});
};

//form controller

const uploadData = asyncHandler(async(req,res)=>{
    const data = req.body;

    // Validate the data
    const validationErrors = await validateData(data);
  
    if (validationErrors) {
      return res.status(400).json({ errors: validationErrors });
    }
  
    // If validation passes, save the data to the database
    try {
      const newRecord = new PersonalInfo(data);
      await newRecord.save();
  
      // Send success response
      return res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error('Error saving data to the database:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
})

const getData = asyncHandler(async(req,res)=>{
    try {
        // Fetch data from the database (assuming you have a PersonalInfo model)
        const data = await PersonalInfo.find();
    
        // Return the data in the response
        res.status(200).json(data);
      } catch (error) {
        // Handle any errors that might occur during database query
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
})


const changeStatus = asyncHandler(async(req,res)=>{
    try {
        // Assuming you have a parameter in the request, like studentId, to identify the student
        const { studentId } = req.body;

    
        // Find the student by ID
        const student = await PersonalInfo.findById(studentId);
    
        // Check if the student is found
        if (!student) {
          return res.status(404).json({ success: false, message: 'Student not found' });
        }
    
        // Toggle the status field
        student.status = !student.status;
    
        // Save the updated student
        await student.save();
    
        // Return the updated status
        res.status(200).json({ success: true, status: student.status });
      } catch (error) {
        // Handle errors
        console.error('Error changing status:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
})

const deleteData = asyncHandler(async(req,res)=>{
    try {
        // Assuming you have a parameter in the request, like studentId, to identify the student
        const { studentId } = req.body;
    
        // Find the student by ID and remove it
        const deletedStudent = await PersonalInfo.findByIdAndDelete(studentId);
    
        // Check if the student is found
        if (!deletedStudent) {
          return res.status(404).json({ success: false, message: 'Student not found' });
        }
    
        // Return success message
        res.status(200).json({ success: true, message: 'Student deleted successfully' });
      } catch (error) {
        // Handle errors
        console.error('Error deleting student:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
})

const getOneStudentData = asyncHandler(async (req, res) => {
    try {
      const { studentId } = req.params;
  
      // Assuming you have a PersonalInfo model for your student data
      const student = await PersonalInfo.findById(studentId);
  
      // Check if the student is found
      if (!student) {
        return res.status(404).json({ success: false, message: 'Student not found' });
      }
  
      // Return the student data
      res.status(200).json({ success: true, data: student });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  

  const updateStudentData = asyncHandler(async (req, res) => {
    try {
      const { studentId } = req.params;
      const updatedData = req.body; // Contains the updated data
  
      // Assuming you have a PersonalInfo model for your student data
      const student = await PersonalInfo.findByIdAndUpdate(studentId, updatedData, {
        new: true, // Return the modified document rather than the original
        runValidators: true, // Run model validation on update
      });
  
      // Check if the student is found
      if (!student) {
        return res.status(404).json({ success: false, message: 'Student not found' });
      }
  
      res.status(200).json({ success: true, message: 'Student data updated successfully', data: student });
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  


export {
    adminAuth,
    adminRegister,
    adminLogout,
    uploadData,
    getData,
    changeStatus,
    deleteData,
    getOneStudentData,
    updateStudentData
};
