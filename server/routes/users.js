import {Router} from 'express'
import { addProgramIdToUser, getUser} from '../controllers/programs.js'
import authentication from '../middleware/authentication.js'


const router= Router()


router.post('/addProgramIdToUser', addProgramIdToUser)
router.get('/getUser/:id',getUser)
export default router