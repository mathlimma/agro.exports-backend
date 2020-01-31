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
    min_price: {
      type: Number,
      required: true,
    },
    intended_price: {
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
  },
  { timestamps: true }
);

export default model('Supply', SupplySchema);
