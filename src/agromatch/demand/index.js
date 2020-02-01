class AgroMatchDemand {
  constructor(demand) {
    this.demand = demand;
  }

  async metrics() {
    // query do produto
    // percorre toda a collection de supply onde o product_id === this.demand.product_id && closed === false
    for (const priority of this.demand.priority) {
      switch (priority) {
        case 'price':
          break;
        case 'location':
          break;
        case 'amount':
          break;

        default:
      }
    }
  }

  async product() {}

  async price() {}

  async location() {}

  async amount() {}
}

export default AgroMatchDemand;
