import Producer from '../models/Producer';

class ProducersProductController {
  async store(req, res) {
    const { product_id } = req.params;
    if (req.type === 'Customer')
      return res.status(401).send({
        error: 'Apenas produtores podem ter seus produtos cadastrados',
      });
    const producer = await Producer.findById(req.userId);
    producer.products_id.push(product_id);

    await producer.save();

    return res.json({ products_id: producer.products_id });
  }

  async index(req, res) {
    if (req.type === 'Customer')
      return res.status(401).send({
        error: 'Apenas produtores podem ter seus produtos cadastrados',
      });

    const producer = await Producer.findById(req.userId).populate({
      path: 'products_id',
      model: 'Product',
    });

    return res.json(producer);
  }
}

export default new ProducersProductController();
