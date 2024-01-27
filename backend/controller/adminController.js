import asyncHandler from 'express-async-handler';
import admin from '../schema/adminBasicModel.js';
import generateAdminToken from '../utils/generateToken.js'


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


export {
    adminAuth,
    adminRegister,
    adminLogout,
};
