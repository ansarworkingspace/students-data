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




export {
    adminAuth,
    adminRegister,
    adminLogout,
    uploadData
};
