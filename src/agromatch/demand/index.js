import Supply from '../../app/models/Supply';

class AgroMatchDemand {
  constructor(demand) {
    this.demand = demand;
    this.supplies = null;
  }

  async metrics() {
    // query do produto
    // percorre toda a collection de supply onde o product_id === this.demand.product_id && closed === false
    await this.run();
    this.finish();
  }

  async run() {
    this.supplies = await Supply.find({
      $and: [{ product_id: this.demand.product_id }, { active: true }],
      price: { $lte: this.demand.price },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [this.demand.longitude, this.demand.latitude],
          },
          $maxDistance: this.demand.max_distance_km * 1000,
        },
      },
    }).sort({ price: -1, updatedAt: -1 });
  }

  finish() {
    // Apenas o id que interessa
    this.supplies = this.supplies.map(({ _id }) => _id);
  }
}

export default AgroMatchDemand;
