import { Schema, model } from 'mongoose';

const DemandSchema = new Schema(
  {
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
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
    max_distance_km: {
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

export default model('Demand', DemandSchema);
