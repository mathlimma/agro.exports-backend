import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Auth from '../../config/auth';

const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    city: {
      type: String,
    },
    cnpj: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 8,
    },
    avatar_id: {
      type: Schema.Types.ObjectId,
      ref: 'File',
      default: null,
    },
  },
  { timestamps: true }
);

// hooks == triggers
CustomerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) next();
  this.password = await bcryptjs.hash(this.password, 8);
});

// methods
CustomerSchema.methods = {
  compareHash(password) {
    return bcryptjs.compare(password, this.password);
  },
  generateToken() {
    return jwt.sign({ id: this._id, type: 'Customer' }, Auth.secret, {
      expiresIn: '7d',
    });
  },
};

export default model('Customer', CustomerSchema);
