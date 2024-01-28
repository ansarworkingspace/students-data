import express from 'express'
import { adminAuth,adminRegister,adminLogout, uploadData,getData} from '../controller/adminController.js'

const router = express.Router()


router.post('/adminRegister', adminRegister );
router.post('/authAdmin', adminAuth);
router.post('/logout', adminLogout);
router.post('/uploadData',uploadData)
router.get('/getData',getData)

export default router