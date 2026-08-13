import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import subscriberRoutes from './routes/subscriberRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

import Product from './models/Product.js';
import sampleProducts from './seeder.js';

dotenv.config();

// Connect Database
connectDB();

const app = express();
const __dirname = path.resolve();

// 1. Configured CORS Middleware
const allowedOrigins = [
  'https://lavishloom.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, true); // Fallback to allow requests during cross-domain calls
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json());

// 2. Static File Serving (Uploads & Product Images)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname, 'public')));

// 3. Health Check Endpoint
app.get('/', (req, res) => {
  res.send('LavishLoom Backend API is running smoothly!');
});

// 4. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/payments', paymentRoutes);

// 5. Cloud Seed Route
app.get('/api/seed-cloud', async (req, res) => {
  try {
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    res.status(200).send('Database successfully seeded on MongoDB!');
  } catch (error) {
    res.status(500).json({ message: 'Seeding failed', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server executing gracefully on port ${PORT}`));