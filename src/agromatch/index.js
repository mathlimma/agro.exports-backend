import AgroMatchDemand from './demand';

export default async function agroMatchInitDemand(demand) {
  const agromatch = await new AgroMatchDemand(demand);

  return agromatch;
}
