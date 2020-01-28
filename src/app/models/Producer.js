import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Auth from '../../config/auth';

const ProducerSchema = new Schema(
  {
    name: {
      type: String,
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
    cpf: {
      type: String,
      unique: true,
      required: true,
    },
    age: {
      type: String,
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
ProducerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) next();
  this.password = await bcryptjs.hash(this.password, 8);
});

// methods
ProducerSchema.methods = {
  compareHash(password) {
    return bcryptjs.compare(password, this.password);
  },
  generateToken() {
    return jwt.sign({ id: this._id, type: 'Producer' }, Auth.secret, {
      expiresIn: '7d',
    });
  },
};

export default model('Producer', ProducerSchema);
