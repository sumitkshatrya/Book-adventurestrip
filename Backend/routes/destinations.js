import { Router } from 'express';
const router = Router();
import { getAllDestinations, getDestination, createDestination, updateDestination, searchDestinations } from '../controllers/destinationController.js';

router.get('/', getAllDestinations);
router.get('/search', searchDestinations);
router.get('/:slug', getDestination); // Fixed function name
router.post('/', createDestination);
router.put('/:id', updateDestination);

export default router;