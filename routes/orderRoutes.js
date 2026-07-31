import express from 'express';
import { addOrderItems, getMyOrders, getAllOrders } from '../controllers/orderController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
const router = express.Router();
router.route('/').post(protect, addOrderItems).get(protect, adminOnly, getAllOrders);
router.route('/myorders').get(protect, getMyOrders);
export default router;