import { Schema, model } from 'mongoose';
import agroMatchInitDemand from '../../agromatch';

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
    price: {
      type: Number,
      required: true,
    },
    max_price: {
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
    priority: {
      type: [String],
      required: true,
    },
    closed: {
      type: Boolean,
      default: false,
    },
    supplies_id: {
      type: Schema.Types.ObjectId,
      ref: 'Supply',
    },
  },
  { timestamps: true }
);

async function trigger(demand) {
  const agroMatch = await agroMatchInitDemand(demand);
  console.log(agroMatch);
}

DemandSchema.post('findOneAndUpdate', trigger);

DemandSchema.post('save', trigger);

export default model('Demand', DemandSchema);