import express from 'express'
import { adminAuth,adminRegister,adminLogout, uploadData,getData,changeStatus,deleteData,getOneStudentData,updateStudentData} from '../controller/adminController.js'

const router = express.Router()


router.post('/adminRegister', adminRegister );
router.post('/authAdmin', adminAuth);
router.post('/logout', adminLogout);
router.post('/uploadData',uploadData)
router.get('/getData',getData)
router.post('/changeStatus', changeStatus);
router.delete('/deleteData',deleteData)
router.get('/getOneStudentData/:studentId', getOneStudentData);
router.put('/updateStudentData/:studentId', updateStudentData);





export default router