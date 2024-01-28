import mongoose from 'mongoose';

const { Schema } = mongoose;

const personalInfoSchema = new Schema({
    name: { type: String, required: true },
    stack: { type: String, required: true },
    dob: { type: Date, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    fatherName: { type: String, required: true },
    fatherContact: { type: String, required: true },
    motherName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    studentContact: { type: String, required: true },    
    guardianName: { type: String },
    relationshipWithGuardian: { type: String },
    guardianContact: { type: String },
    address: { type: String, required: true },
    village: { type: String },
    taluk: { type: String },
    qualification: { type: String },
    schoolCollege: { type: String },

    workExperience:{ type: Number, required: true }, 
    companyName: { type: String, required: true }, 
    designation: { type: String, required: true },

});

const PersonalInfo = mongoose.model('PersonalInfo', personalInfoSchema);

export default PersonalInfo;
