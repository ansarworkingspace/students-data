import express from 'express'
import { adminAuth,adminRegister,adminLogout, uploadData} from '../controller/adminController.js'

const router = express.Router()


router.post('/adminRegister', adminRegister );
router.post('/authAdmin', adminAuth);
router.post('/logout', adminLogout);
router.post('/uploadData',uploadData)


export default router