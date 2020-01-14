import mongoose from 'mongoose';

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = mongoose.connect('mongodb://localhost/agroExports', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
