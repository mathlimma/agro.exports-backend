import Supply from '../../app/models/Supply';

class AgroMatchDemand {
  constructor(demand) {
    this.demand = demand;
    this.supplies = null;
  }

  async metrics() {
    // query do produto
    // percorre toda a collection de supply onde o product_id === this.demand.product_id && closed === false
    this.supplies = await this.product();

    for (const priority of this.demand.priority) {
      switch (priority) {
        case 'price':
          this.supplies = await this.price();
          break;
        case 'location':
          break;
        case 'amount':
          break;

        default:
      }
    }
  }

  async product() {
    const products = await Supply.find({
      product_id: this.demand.product_id,
    }).sort('-createdAt');

    return products;
  }

  async price() {
    const prices = await this.supplies
      .find({
        price: { $lte: this.demand.max_price },
      })
      .sort('-price');

    return prices;
  }

  async location() {}

  async amount() {}

  finish() {
    // Apenas o id que interessa
    this.supplies = this.supplies.map(({ _id }) => _id);
  }
}

export default AgroMatchDemand;
