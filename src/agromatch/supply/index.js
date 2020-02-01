import Demand from '../../app/models/Demand';

class AgroMatchDemand {
  constructor(supply) {
    this.supply = supply;
    this.demands = null;
  }

  async metrics() {
    // query do produto
    // percorre toda a collection de supply onde o product_id === this.demand.product_id && closed === false
    this.demands = await this.product();
  }

  async product() {
    const products = await Demand.find({
      $and: [{ product_id: this.demand.product_id }, { closed: false }],
    }).sort('-createdAt');

    return products;
  }

  async price() {
    const prices = await this.demands
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
    this.supplies = this.demands.map(({ _id }) => _id);
  }
}

export default AgroMatchDemand;
