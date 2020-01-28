import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Auth from '../../config/auth';

const EceSchema = new Schema({}, { timestamps: true });

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
    return jwt.sign({ id: this._id }, Auth.secret, { expiresIn: '7d' });
  },
};

export default model('Ece', EceSchema);
