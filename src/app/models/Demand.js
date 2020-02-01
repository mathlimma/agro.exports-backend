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
  },
  { timestamps: true }
);

DemandSchema.post('findOneAndUpdate', function(demand) {
  agroMatchInitDemand(demand);
});

DemandSchema.post('save', function(demand) {
  agroMatchInitDemand(demand);
});

export default model('Demand', DemandSchema);
