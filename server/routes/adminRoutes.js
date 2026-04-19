import { Router } from 'express';
import multer from 'multer';
import { uploadPhoto, getPhoto, servePhoto } from '../controllers/adminRoutes.js';

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

// Upload photo route with multer middleware
router.post('/uploadPhoto', upload.single('photo'), uploadPhoto);

// Route to get photo metadata filtered by userEmail
router.get('/getPhoto', getPhoto);

// Route to serve the actual image binary by imageId
router.get('/getPhoto/:id', servePhoto);

export default router;
