import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);


import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path'; // 1. ADDED: Path module for handling directory paths
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import subscriberRoutes from './routes/subscriberRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js'; // 2. ADDED: Payment route import

import Product from './models/Product.js';
import sampleProducts from './seeder.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// 3. ADDED: Serve the uploaded files statically so images can be accessed via URL
app.use('/uploads', express.static(path.join(path.resolve(), 'public/uploads')));

// API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/payments', paymentRoutes); // 4. ADDED: Register payment endpoint

// Cloud seed trigger route
app.get('/api/seed-cloud', async (req, res) => {
  try {
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    res.status(200).send("Database successfully seeded on MongoDB!");
  } catch (error) {
    res.status(500).json({ message: "Seeding failed", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server executing gracefully on port ${PORT}`));