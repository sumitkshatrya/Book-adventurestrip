import { Router } from 'express';
const router = Router();
import { createBooking, getBooking, getUserBookings, cancelBooking } from '../controllers/bookingController.js';

router.post('/', createBooking);
router.get('/:id', getBooking);
router.get('/user/:email', getUserBookings);
router.put('/:id/cancel', cancelBooking);

export default router;