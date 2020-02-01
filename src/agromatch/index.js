import AgroMatchSupply from './supply';

export default async function agroMatchInitSupply(supply) {
  // Instanciando o agromatch
  const agromatch = new AgroMatchSupply(supply);
  // Executando os metodos necessarios
  await agromatch.metrics();
  agromatch.finish();

  return agromatch;
}
