import Demand from '../models/Demand';

class EceDemandsController {
  async show(req, res) {
    const demands = await Demand.find({ ece_id: req.userId }).populate({
      path: 'product_id',
      model: 'Product',
      populate: {
        path: 'photo_id',
        model: 'File',
      },
    });

    return res.json(demands);
  }
}

export default new EceDemandsController();
