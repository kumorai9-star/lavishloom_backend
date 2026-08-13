import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/db.js';

export const sampleProducts = [
  {
    name: "Heirloom Denim Utility Jacket",
    price: 185,
    collectionName: "Heritage Collection",
    category: "Boys",
    type: "Jacket",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    colors: [
      { name: "Deep Indigo", hex: "#1B2A41" },
      { name: "Rust", hex: "#B4713F" },
      { name: "Stone", hex: "#DCD4C5" }
    ],
    variants: [
      { size: "2-3Y", color: "Deep Indigo", stock: 5 },
      { size: "2-3Y", color: "Rust", stock: 0 },
      { size: "2-3Y", color: "Stone", stock: 3 },
      { size: "4-5Y", color: "Deep Indigo", stock: 0 },
      { size: "4-5Y", color: "Rust", stock: 8 },
      { size: "4-5Y", color: "Stone", stock: 2 },
      { size: "6-7Y", color: "Deep Indigo", stock: 4 },
      { size: "6-7Y", color: "Rust", stock: 0 },
      { size: "6-7Y", color: "Stone", stock: 6 },
      { size: "8-9Y", color: "Deep Indigo", stock: 0 },
      { size: "8-9Y", color: "Rust", stock: 0 },
      { size: "8-9Y", color: "Stone", stock: 0 }
    ],
    images: [
      { url: "/images/pic1.jpeg", alt: "Heirloom Denim Utility Jacket, front view" },
      { url: "/images/pic2.jpeg", alt: "Heirloom Denim Utility Jacket, detail view" },
      { url: "/images/pic10.jpeg", alt: "Heirloom Denim Utility Jacket, back view" }
    ],
    description: "Crafted from premium 12oz raw Japanese denim, this utility jacket is designed to age beautifully through generations. Featuring reinforced patch pockets, triple-needle stitching, and a tailored yet comfortable fit for active play.",
    rating: 5,
    reviews: 48,
    isNewArrival: false
  },
  {
    name: "Artisan Wide Trousers",
    price: 125,
    collectionName: "The Solstice Edit",
    category: "Boys",
    type: "Trousers",
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    colors: [{ name: "Sandstone", hex: "#C9A688" }],
    variants: [
      { size: "2Y", color: "Sandstone", stock: 6 },
      { size: "4Y", color: "Sandstone", stock: 0 },
      { size: "6Y", color: "Sandstone", stock: 4 },
      { size: "8Y", color: "Sandstone", stock: 2 }
    ],
    images: [{ url: "/images/pic16.jpeg", alt: "Artisan Wide Trousers in sandstone" }],
    description: "Relaxed-fit trousers in brushed cotton twill, built for climbing trees and long afternoons outside.",
    rating: 5,
    reviews: 21,
    isNewArrival: false
  },
  {
    name: "Linen Pinstripe Ensemble",
    price: 210,
    collectionName: "Premium Linen",
    category: "Girls",
    type: "Set",
    sizes: ["0-3M", "6-12M", "2Y"],
    colors: [{ name: "Sandstone / Ivory", hex: "#EDE6D6" }],
    variants: [
      { size: "0-3M", color: "Sandstone / Ivory", stock: 3 },
      { size: "6-12M", color: "Sandstone / Ivory", stock: 0 },
      { size: "2Y", color: "Sandstone / Ivory", stock: 5 }
    ],
    images: [{ url: "/images/pic16.jpeg", alt: "Linen Pinstripe Ensemble two-piece set" }],
    description: "A two-piece linen set with a hand-finished pinstripe weave, soft against delicate skin.",
    rating: 4,
    reviews: 12,
    isNewArrival: false
  },
  {
    name: "Studio Ribbed Tank",
    price: 68,
    collectionName: "Latest Arrivals",
    category: "Girls",
    type: "Tank",
    sizes: ["2Y", "4Y", "6Y"],
    colors: [
      { name: "Black", hex: "#1B2436" },
      { name: "Red", hex: "#B23A3A" }
    ],
    variants: [
      { size: "2Y", color: "Black", stock: 4 },
      { size: "2Y", color: "Red", stock: 0 },
      { size: "4Y", color: "Black", stock: 0 },
      { size: "4Y", color: "Red", stock: 7 },
      { size: "6Y", color: "Black", stock: 2 },
      { size: "6Y", color: "Red", stock: 3 }
    ],
    images: [
      { url: "/images/pic21.jpeg", alt: "Studio Ribbed Tank, front view" },
      { url: "/images/pic22.jpeg", alt: "Studio Ribbed Tank, detail view" }
    ],
    description: "A ribbed knit tank layered for play or dressed up for the studio.",
    rating: 5,
    reviews: 9,
    isNewArrival: true
  },
  {
    name: "Coastal Stripe Cami",
    price: 82,
    collectionName: "Latest Arrivals",
    category: "Girls",
    type: "Cami",
    sizes: ["4Y", "6Y", "8Y"],
    colors: [{ name: "Red Stripe", hex: "#B23A3A" }],
    variants: [
      { size: "4Y", color: "Red Stripe", stock: 5 },
      { size: "6Y", color: "Red Stripe", stock: 0 },
      { size: "8Y", color: "Red Stripe", stock: 1 }
    ],
    images: [
      { url: "/images/pic22.jpeg", alt: "Coastal Stripe Cami, front view" },
      { url: "/images/pic1.jpeg", alt: "Coastal Stripe Cami, detail view" }
    ],
    description: "Breton-inspired stripes in organic cotton jersey, cut for warm-weather wandering.",
    rating: 5,
    reviews: 15,
    isNewArrival: true
  },
  {
    name: "Linen Heritage Set",
    price: 185,
    collectionName: "Denim Heritage",
    category: "Girls",
    type: "Set",
    sizes: ["2Y", "4Y", "6Y", "8Y", "10Y"],
    colors: [{ name: "Sandstone", hex: "#C9A688" }],
    variants: [
      { size: "2Y", color: "Sandstone", stock: 0 },
      { size: "4Y", color: "Sandstone", stock: 6 },
      { size: "6Y", color: "Sandstone", stock: 3 },
      { size: "8Y", color: "Sandstone", stock: 0 },
      { size: "10Y", color: "Sandstone", stock: 2 }
    ],
    images: [{ url: "/images/pic6.jpeg", alt: "Linen Heritage Set, front view" }],
    description: "Artisanal weave, sandstone tone — a foundational piece for the curated wardrobe.",
    rating: 5,
    reviews: 18,
    isNewArrival: false
  },
  {
    name: "Atelier Plaid Skirt",
    price: 142,
    collectionName: "Denim Heritage",
    category: "Girls",
    type: "Skirt",
    sizes: ["4Y", "6Y", "8Y"],
    colors: [{ name: "Plaid", hex: "#3A3A3A" }],
    variants: [
      { size: "4Y", color: "Plaid", stock: 2 },
      { size: "6Y", color: "Plaid", stock: 0 },
      { size: "8Y", color: "Plaid", stock: 4 }
    ],
    images: [
      { url: "/images/pic7.jpeg", alt: "Atelier Plaid Skirt, front view" },
      { url: "/images/pic10.jpeg", alt: "Atelier Plaid Skirt, detail view" }
    ],
    description: "A limited edition workshop piece in heritage plaid wool blend.",
    rating: 5,
    reviews: 7,
    isNewArrival: true
  },
  {
    name: "Indigo Chore Jacket",
    price: 210,
    collectionName: "Denim Heritage",
    category: "Boys",
    type: "Jacket",
    sizes: ["4Y", "6Y", "8Y", "10Y"],
    colors: [{ name: "Navy Heritage", hex: "#1B2A41" }],
    variants: [
      { size: "4Y", color: "Navy Heritage", stock: 0 },
      { size: "6Y", color: "Navy Heritage", stock: 0 },
      { size: "8Y", color: "Navy Heritage", stock: 0 },
      { size: "10Y", color: "Navy Heritage", stock: 0 }
    ],
    images: [
      { url: "/images/pic2.jpeg", alt: "Indigo Chore Jacket, front view" },
      { url: "/images/pic3.jpeg", alt: "Indigo Chore Jacket, detail view" }
    ],
    description: "Raw denim chore jacket built on a heritage silhouette, made to be handed down.",
    rating: 5,
    reviews: 22,
    isNewArrival: false
  },
  {
    name: "Loom Trousers",
    price: 120,
    collectionName: "Linen Essentials",
    category: "Boys",
    type: "Trousers",
    sizes: ["2Y", "4Y", "6Y", "8Y", "10Y"],
    colors: [{ name: "Stone", hex: "#DCD4C5" }],
    variants: [
      { size: "2Y", color: "Stone", stock: 5 },
      { size: "4Y", color: "Stone", stock: 4 },
      { size: "6Y", color: "Stone", stock: 6 },
      { size: "8Y", color: "Stone", stock: 3 },
      { size: "10Y", color: "Stone", stock: 1 }
    ],
    images: [
      { url: "/images/pic3.jpeg", alt: "Loom Trousers, front view" },
      { url: "/images/pic4.jpeg", alt: "Loom Trousers, detail view" }
    ],
    description: "Relaxed fit trousers in undyed stone linen.",
    rating: 4,
    reviews: 6,
    isNewArrival: false
  },
  {
    name: "Cloud Cotton Onesie",
    price: 58,
    collectionName: "Newborn Edit",
    category: "Newborn",
    type: "Set",
    sizes: ["0-3M", "3-6M", "6-9M"],
    colors: [{ name: "Ivory", hex: "#F0EBDD" }],
    variants: [
      { size: "0-3M", color: "Ivory", stock: 6 },
      { size: "3-6M", color: "Ivory", stock: 0 },
      { size: "6-9M", color: "Ivory", stock: 4 }
    ],
    images: [
      { url: "/images/pic4.jpeg", alt: "Cloud Cotton Onesie, front view" },
      { url: "/images/pic5.jpeg", alt: "Cloud Cotton Onesie, detail view" }
    ],
    description: "Whisper-soft organic cotton for the earliest days.",
    rating: 5,
    reviews: 3,
    isNewArrival: false
  }
];

// Standalone CLI seeding function (only runs if executed via `node seeder.js`)
const runStandaloneSeeder = async () => {
  dotenv.config();
  await connectDB();
  try {
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log("Database successfully seeded via CLI script!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

// Check if file is called directly via `node seeder.js`
if (process.argv[1].includes('seeder.js')) {
  runStandaloneSeeder();
}

export default sampleProducts;