import { Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    photo_url: {
      type: String,
    },
    facebook_id: {
      type: String,
    },
    google_id: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.methods = {
  generate_token() {
    return jwt.sign({ user_id: this._id }, authConfig.secret, {
      expiresIn: '7D',
    });
  },
};

export default model('User', UserSchema);
