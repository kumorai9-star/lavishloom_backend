import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();
await connectDB();

const sampleProducts = [
  {
    name: "Heritage Japanese Denim Jacket",
    price: 135,
    collectionName: "Heritage Collection",
    category: "Outerwear",
    type: "Jacket",
    sizes: ["2T", "3T", "4T", "5T"],
    colors: [
      { name: "Raw Indigo", hex: "#1B263B" },
      { name: "Washed Slate", hex: "#708090" }
    ],
    variants: [
      { size: "2T", color: "Raw Indigo", stock: 10 },
      { size: "3T", color: "Raw Indigo", stock: 15 }
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=800",
        alt: "Heritage Japanese Denim Jacket"
      }
    ],
    description: "Tailored from 12oz raw Japanese selvage denim with reinforced brass button accents.",
    rating: 5,
    reviews: 18,
    isNewArrival: true,
    materials: "100% Japanese Selvage Denim",
    careInstructions: "Hand wash cold, line dry."
  },
  {
    name: "Organic Linen Apron Dress",
    price: 92,
    collectionName: "Linen Essentials",
    category: "Dresses",
    type: "Dress",
    sizes: ["18M", "2T", "3T", "4T"],
    colors: [
      { name: "Oatmeal", hex: "#E3D5CA" },
      { name: "Soft Olive", hex: "#556B2F" },
      { name: "Terracotta", hex: "#E07A5F" }
    ],
    variants: [
      { size: "2T", color: "Oatmeal", stock: 8 }
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=800",
        alt: "Organic Linen Apron Dress"
      }
    ],
    description: "Pure French flax linen piece with cross-back straps for uninhibited movement.",
    rating: 5,
    reviews: 12,
    isNewArrival: true,
    materials: "100% French Flax Linen",
    careInstructions: "Machine wash gentle cold, tumble dry low."
  },
  {
    name: "Merino Wool Knit Cardigan",
    price: 110,
    collectionName: "Heritage Collection",
    category: "Knitwear",
    type: "Cardigan",
    sizes: ["12M", "18M", "2T", "3T"],
    colors: [
      { name: "Cream", hex: "#FFFDD0" },
      { name: "Charcoal", hex: "#36454F" }
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&q=80&w=800",
        alt: "Merino Wool Knit Cardigan"
      }
    ],
    description: "Ultra-soft 100% extrafine Merino wool knit with horn button details.",
    rating: 4.9,
    reviews: 9,
    isNewArrival: false,
    materials: "100% Extrafine Merino Wool",
    careInstructions: "Hand wash cold, dry flat."
  },
  {
    name: "Tailored Linen Trousers",
    price: 78,
    collectionName: "Linen Essentials",
    category: "Pants",
    type: "Trousers",
    sizes: ["2T", "3T", "4T", "5T"],
    colors: [
      { name: "Earthy Taupe", hex: "#B38B6D" },
      { name: "Natural Linen", hex: "#D7C4B7" }
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=800",
        alt: "Tailored Linen Trousers"
      }
    ],
    description: "Relaxed fit, breathable organic linen trousers with an adjustable interior waistband.",
    rating: 4.8,
    reviews: 15,
    isNewArrival: false,
    materials: "100% Organic Linen",
    careInstructions: "Machine wash cold, lay flat to dry."
  }
];

const seedDB = async () => {
  try {
    await Product.deleteMany(); // Wipes old unformatted items
    await Product.insertMany(sampleProducts);
    console.log("Database successfully seeded with Atelier products!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDB();