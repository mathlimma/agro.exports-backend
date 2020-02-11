import mongoose from 'mongoose';
import Demand from '../app/models/Demand';
import Supply from '../app/models/Supply';

class Database {
  constructor() {
    this.init();
  }

  async init() {
    this.connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    await Demand.ensureIndexes();
    await Supply.ensureIndexes();
  }
}

export default new Database();
