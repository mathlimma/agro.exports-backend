import { Schema, model } from 'mongoose';
import PointSchema from './utils/PointSchema';

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
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      type: PointSchema,
      index: { type: '2dsphere', sparse: false },
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default model('Supply', SupplySchema);
