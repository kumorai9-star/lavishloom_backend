import express from 'express';
import { 
  authUser, 
  registerUser, 
  updateProfile, 
  toggleWishlist, 
  getWishlist 
} from '../controllers/usercontroller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Routes
router.post('/login', authUser);
router.post('/register', registerUser);

// Protected Routes
router.put('/profile', protect, updateProfile);
router.get('/wishlist', protect, getWishlist);
router.post('/wishlist', protect, toggleWishlist);

export default router;