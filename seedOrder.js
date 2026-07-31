import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from './models/Order.js';
import User from './models/User.js';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();
await connectDB();

const seedOrder = async () => {
  try {
    // 1. Find or auto-create the user kumorai9
    let user = await User.findOne({ email: 'kumorai9@gmail.com' });

    if (!user) {
      console.log('👤 User not found. Creating user kumorai9@gmail.com...');
      user = await User.create({
        name: 'kumorai9',
        email: 'kumorai9@gmail.com',
        password: 'password123', // Dummy password for seed user
        phone: '9764736733',
        shippingAddress: { address: 'hello' }
      });
    }

    // 2. Find any product in database to link the reference ObjectId
    const product = await Product.findOne();

    // 3. Clear existing test orders
    await Order.deleteMany();

    // 4. Create sample order matching your exact Order.js schema
    const newOrder = new Order({
      user: user._id,
      orderItems: [
        {
          title: 'Heirloom Denim Utility Jacket',
          qty: 1,
          price: 685,
          size: '2-3Y',
          color: 'Deep Indigo',
          product: product ? product._id : new mongoose.Types.ObjectId()
        }
      ],
      shippingAddress: {
        fullName: user.name || 'kumorai9',
        address: user.shippingAddress?.address || 'hello',
        city: 'Pokhara',
        postalCode: '33700'
      },
      paymentMethod: 'Card',
      subtotal: 685,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 685,
      status: 'PROCESSING'
    });

    await newOrder.save();
    console.log('✅ Order successfully saved to MongoDB orders collection!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedOrder();