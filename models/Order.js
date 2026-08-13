import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [
    {
      title: { type: String, required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
      size: { type: String },
      color: { type: String },
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
    }
  ],
  shippingAddress: {
    fullName: String,
    address: String,
    city: String,
    postalCode: String
  },
  paymentMethod: { type: String, default: 'Card' },
  paymentProof: { type: String, default: '' },
  subtotal: { type: Number, required: true },
  shippingPrice: { type: Number, default: 0 },
  taxPrice: { type: Number, default: 0 },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'RETURNED'], default: 'PENDING' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);