import File from '../models/File';
import Customer from '../models/Customer';
import Producer from '../models/Producer';

class AvatarController {
  async store(req, res) {
    const file = await File.create({
      name: req.file.filename,
    });

    if (req.type === 'Customer') {
      const customer = await Customer.findById(req.userId);
      customer.avatar_id = file._id;
      await customer.save();

      return res.json({ url: file.url });
    }

    const producer = await Producer.findById(req.userId);
    producer.avatar_id = file._id;
    await producer.save();

    return res.json({ url: file.url });
  }
}

export default new AvatarController();
