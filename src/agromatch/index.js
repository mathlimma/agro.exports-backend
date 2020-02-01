import AgroMatchDemand from './demand';

export default async function agroMatchInitDemand(demand) {
  // Instanciando o agromatch
  const agromatch = new AgroMatchDemand(demand);
  // Executando os metodos necessarios
  await agromatch.metrics();
  agromatch.finish();

  return agromatch;
}
