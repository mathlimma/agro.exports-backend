class AgroMatchDemand {
  constructor(demand) {
    this.demand = demand;
  }

  async metrics() {
    await this.product();
    await this.amount();
    await this.price();
    await this.location();
  }

  async product() {}

  async price() {}

  async location() {}

  async amount() {}
}

export default AgroMatchDemand;
