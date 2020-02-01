import { Schema, model } from 'mongoose';
import agroMatchInitSupply from '../../agromatch';

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
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

async function trigger(supply) {
  // validate com yup
  const agroMatch = await agroMatchInitSupply(supply);
  console.log(agroMatch.demands);
}

SupplySchema.post('findOneAndUpdate', trigger);

SupplySchema.post('save', trigger);

export default model('Supply', SupplySchema);
