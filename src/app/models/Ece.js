import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Auth from '../../config/auth';

const EceSchema = new Schema(
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
    description: {
      type: String,
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
    push_token: {
      type: String,
    },
    tel: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// hooks == triggers
EceSchema.pre('save', async function(next) {
  if (!this.isModified('password')) next();
  this.password = await bcryptjs.hash(this.password, 8);
});

// methods
EceSchema.methods = {
  compareHash(password) {
    return bcryptjs.compare(password, this.password);
  },
  generateToken() {
    return jwt.sign({ id: this._id, type: 'Ece' }, Auth.secret, {
      expiresIn: '7d',
    });
  },
};

export default model('Ece', EceSchema);
