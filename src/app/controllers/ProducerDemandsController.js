import Producer from '../models/Producer';

class ProducerDemandsController {
  async index(req, res) {
    const producer = await Producer.findById(req.userId)
      .select('demands_id')
      .populate({
        path: 'demands_id',
        model: 'Demand',
        options: { sort: { created_at: -1 } },
        populate: [
          {
            path: 'ece_id',
            model: 'Ece',
            select: 'avatar_id name',
            populate: {
              path: 'avatar_id',
              model: 'File',
              select: 'name url',
            },
          },
          {
            path: 'product_id',
            model: 'Product',
            select: 'photo_id name',
            populate: {
              path: 'photo_id',
              model: 'File',
              select: 'name url',
            },
          },
        ],
      });

    return res.json(producer);
  }
}

export default new ProducerDemandsController();
