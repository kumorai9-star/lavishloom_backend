import express from 'express';
import multer from 'multer';
import path from 'path';
import Payment from '../models/Payment.js';

const router = express.Router();

// 1. Configure storage location and unique filenames
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `screenshot-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// 2. Filter to allow images only
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

    // Path where the image is accessible via URL
    const screenshotUrl = `/uploads/${req.file.filename}`;

    // Create and save database document
    const payment = new Payment({
      userId: req.body.userId,
      amount: req.body.amount,
      transactionId: req.body.transactionId,
      screenshotUrl: screenshotUrl, // Saved in MongoDB as string
    });

    const savedPayment = await payment.save();

    res.status(201).json({
      message: 'Payment proof submitted successfully!',
      payment: savedPayment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload payment proof', error: error.message });
  }
});

export default router;