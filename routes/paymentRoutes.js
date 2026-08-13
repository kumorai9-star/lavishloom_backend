import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Payment from '../models/Payment.js';

const router = express.Router();

// 1. Ensure public/uploads directory exists on Render disk automatically
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 2. Configure storage location and unique filenames
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `screenshot-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// Filter to allow images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

// 3. POST Route to upload screenshot and save payment in MongoDB
router.post('/upload-proof', upload.single('screenshot'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Payment screenshot is required' });
    }

    const screenshotUrl = `/uploads/${req.file.filename}`;

    // Safely construct payment object without breaking on missing/invalid fields
    const paymentData = {
      amount: Number(req.body.amount) || 0,
      screenshotUrl: screenshotUrl,
    };

    // Only attach userId if it's a valid string ID, not "guest"
    if (req.body.userId && req.body.userId !== 'guest') {
      paymentData.userId = req.body.userId;
    }

    if (req.body.transactionId) {
      paymentData.transactionId = req.body.transactionId;
    }

    const payment = new Payment(paymentData);
    const savedPayment = await payment.save();

    res.status(201).json({
      message: 'Payment proof submitted successfully!',
      payment: savedPayment,
      screenshotUrl: screenshotUrl,
    });
  } catch (error) {
    console.error('Payment upload error:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to upload payment proof', 
      error: error.toString() 
    });
  }
});

export default router;