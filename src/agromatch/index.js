import AgroMatchDemand from './demand';

export default async function agroMatchInitDemand(demand) {
  console.log(demand);
  // Instanciando o agromatch
  const agromatch = new AgroMatchDemand(demand);
  // Executando os metodos necessarios
  await agromatch.metrics();
  agromatch.finish();
  console.log(agromatch);
  return agromatch;
}
