import Producer from '../models/Producer';

class ProducerDemandsController {
  async index(req, res) {
    const producer = await Producer.findById(req.userId).populate({
      path: 'demands_id',
      model: 'Demand',
      populate: [
        {
          path: 'ece_id',
          model: 'Ece',
          populate: {
            path: 'avatar_id',
            model: 'File',
          },
        },
        {
          path: 'product_id',
          model: 'Product',
          populate: {
            path: 'photo_id',
            model: 'File',
          },
        },
      ],
    });

    return res.json(producer);
  }
}

export default new ProducerDemandsController();
