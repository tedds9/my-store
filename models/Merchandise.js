import mongoose from "mongoose";

const MerchandiseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    default: 'HEAVYWEIGHT'
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  sizes: {
    type: [String],
    default: ['S', 'M', 'L', 'XL']
  }
}, {
  collection: 'inventory',
  timestamps: true
});
export const Merchandise = mongoose.model('Merchandise', MerchandiseSchema);