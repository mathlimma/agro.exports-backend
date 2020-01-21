import mongoose from 'mongoose';

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
