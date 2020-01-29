import { Schema, model } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    avg_price: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default model('Product', ProductSchema);
