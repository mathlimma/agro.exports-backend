import { Schema, model } from 'mongoose';

const SupplySchema = new Schema(
  {
    producer_id: {
      type: Schema.Types.ObjectId,
      ref: 'Producer',
      required: true,
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    photos: [
      {
        type: Schema.Types.ObjectId,
        ref: 'File',
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    kg_amount: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    closed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model('Supply', SupplySchema);
