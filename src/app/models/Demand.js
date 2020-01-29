import { Schema, model } from 'mongoose';

const DemandSchema = new Schema(
  {
    ece_id: {
      type: Schema.Types.ObjectId,
      ref: 'Ece',
      required: true,
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
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

export default model('Demand', DemandSchema);
