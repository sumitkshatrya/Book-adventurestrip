import { Router } from 'express';
const router = Router();
import { uploadImage, uploadMultipleImages, deleteImage } from '../controllers/uploadController.js';
import { uploadSingle, uploadMultiple } from '../middleware/upload.js';

router.post('/single', uploadSingle, uploadImage);
router.post('/multiple', uploadMultiple, uploadMultipleImages);
router.delete('/', deleteImage);

export default router;