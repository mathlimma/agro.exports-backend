import Demand from '../models/Demand';

class EceDemandsController {
  async show(req, res) {
    const demands = await Demand.find({ ece_id: req.userId })
      .select('createdAt product_id')
      .sort('-createdAt')
      .populate({
        path: 'product_id',
        model: 'Product',
        select: 'photo_id name',
        populate: {
          path: 'photo_id',
          model: 'File',
          select: 'name url',
        },
      });

    return res.json(demands);
  }
}

export default new EceDemandsController();
