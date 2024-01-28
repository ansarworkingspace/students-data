import express from 'express'
import { adminAuth,adminRegister,adminLogout, uploadData,getData,changeStatus,deleteData} from '../controller/adminController.js'

const router = express.Router()


router.post('/adminRegister', adminRegister );
router.post('/authAdmin', adminAuth);
router.post('/logout', adminLogout);
router.post('/uploadData',uploadData)
router.get('/getData',getData)
router.post('/changeStatus', changeStatus);
router.delete('/deleteData',deleteData)

export default router