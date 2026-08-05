import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import subscriberRoutes from './routes/subscriberRoutes.js';

// Imports for cloud seeding
import Product from './models/Product.js';
import sampleProducts from './seeder.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subscribers', subscriberRoutes);

// Temporary trigger endpoint for cloud database seeding
app.get('/api/seed-cloud', async (req, res) => {
  try {
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    res.status(200).send("Database successfully seeded on MongoDB Atlas!");
  } catch (error) {
    res.status(500).json({ message: "Seeding failed", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server executing gracefully on port ${PORT}`));