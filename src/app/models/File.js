import { Schema, model } from 'mongoose';

const FileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

FileSchema.virtual('url').get(function() {
  return `${process.env.APP_URL}/files/${this.name}`;
});

export default model('File', FileSchema);
