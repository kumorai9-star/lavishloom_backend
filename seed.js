import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/Product.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const sampleProducts = [
  {
    title: "Heirloom Denim Utility Jacket",
    price: 185.00,
    description: "Crafted from premium 12oz raw Japanese denim, this utility jacket is designed to age beautifully through generations. Featuring reinforced patch pockets and triple-needle stitching.",
    category: "Denim Heritage",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    colors: ["DEEP INDIGO", "MIDNIGHT INDIGO"],
    sku: "CH-D-012",
    stock: 5,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
    materials: "12oz Raw Japanese Indigo Cotton Denim",
    careInstructions: "Dry clean only or hand wash cold inside out to preserve raw indigo dye structure."
  },
  {
    title: "Artisan Wide Trousers",
    price: 125.00,
    description: "Relaxed tailored profile cut from structured linen blends. Built for the unhurried spirit of active, daily play.",
    category: "Linen Essentials",
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    colors: ["STONE", "SANDSTONE"],
    sku: "CH-P-4421",
    stock: 3,
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b",
    materials: "80% Organic Belgian Linen, 20% Fine Wool Blend",
    careInstructions: "Hand wash cold with mild detergent. Lay flat to dry out of direct sunlight."
  },
  {
    title: "Linen Pinstripe Ensemble",
    price: 210.00,
    description: "Artisanal weave twin-set combination offering natural airiness and signature minimalist tailoring details.",
    category: "Linen Essentials",
    sizes: ["2Y", "4Y", "6Y"],
    colors: ["SANDSTONE/IVORY"],
    sku: "CH-E-772",
    stock: 2,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea",
    materials: "100% Pure Certified Organic Linen",
    careInstructions: "Gentle wash cycle at or below 30°C. Warm iron if desired."
  },
  {
    title: "Studio Ribbed Tank",
    price: 68.00,
    description: "Ultra-soft knit basic foundational tank top layered easily for premium trans-seasonal comfort formatting.",
    category: "Basics",
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    colors: ["IVORY", "OATMEAL"],
    sku: "CH-T-901",
    stock: 12,
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4",
    materials: "95% GOTS Certified Ribbed Organic Cotton, 5% Elastane for soft recovery stretch",
    careInstructions: "Machine wash warm with similar light colors. Tumble dry low."
  },
  {
    title: "Indigo Chore Jacket",
    price: 210.00,
    description: "Raw indigo canvas structured jacket sporting authentic utility detailing inspired by classical workshop archives.",
    category: "Denim Heritage",
    sizes: ["4Y", "6Y", "8Y", "10Y"],
    colors: ["NAVY HERITAGE"],
    sku: "CH-J-102",
    stock: 4,
    image: "https://images.unsplash.com/photo-1471286174240-e6458e7beb3e",
    materials: "100% Heavyweight Indigo Canvas Cotton",
    careInstructions: "Wash separately inside out. Color may transfer when new."
  }
];

const seedDatabase = async () => {
  try {
    // 1. Establish secure cloud database linkage
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection successful for seeding operations...");

    // 2. Clear out legacy collections to prevent collision keys
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Legacy product and user database fields purged cleanly.");

    // 3. Insert specific administrative master credential patterns
    const salt = await bcrypt.genSalt(10);
    const hashedAdminPassword = await bcrypt.hash("admin1234", salt);
    
    await User.create({
      name: "Eleanor Vance-Sterling",
      email: "e.sterling@lavishloom.com",
      password: hashedAdminPassword,
      role: "admin",
      phone: "+1 (555) 012-3456",
      shippingAddress: {
        address: "124 Boutique Lane",
        city: "Savannah",
        postalCode: "31401",
        country: "USA"
      }
    });
    console.log("Admin account (Eleanor) seeded successfully.");

    // 4. Inject structural inventory arrays
    await Product.insertMany(sampleProducts);
    console.log("Lavishloom Kidz catalog injected successfully with materials and care details!");

    // Exit execution loop safely
    process.exit(0);
  } catch (error) {
    console.error(`Seeding operation failed drastically: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();