import agroMatchInitDemand from '../../../agromatch';

export async function triggerSave(next) {
  console.log('save');
  const agroMatch = await agroMatchInitDemand(this);

  this.supplies_id = agroMatch.supplies;
  next();
}

export async function triggerUpdate() {
  const demand = await this.model.findOne(this.getQuery());
  const agroMatch = await agroMatchInitDemand(demand);

  await this.model.where({ _id: demand._id }).update({
    supplies_id: agroMatch.supplies,
  });
}
