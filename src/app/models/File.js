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
  console.log(process.env.APP_URL);
  return `${process.env.APP_URL}/files/${this.name}`;
});

FileSchema.set('toObject', { virtuals: true });
FileSchema.set('toJSON', { virtuals: true });

export default model('File', FileSchema);
