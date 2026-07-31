import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  collectionName: { type: String, default: 'New Arrivals' },
  category: { type: String, required: true },
  type: { type: String, required: true },
  sizes: [{ type: String }],
  colors: [{ name: String, hex: String }],
  variants: [
    {
      size: String,
      color: String,
      stock: { type: Number, default: 0 },
    },
  ],
  images: [{ url: String, alt: String }],
  description: { type: String, default: '' },
  rating: { type: Number, default: 5 },
  reviews: { type: Number, default: 0 },
  isNewArrival: { type: Boolean, default: false },
  materials: { type: String, default: '100% Organic Cotton' },
  careInstructions: { type: String, default: 'Machine wash cold, lay flat to dry.' },
}, { timestamps: true, suppressReservedKeysWarning: true });

export default mongoose.model('Product', productSchema);