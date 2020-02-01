import File from '../models/File';
import Ece from '../models/Ece';
import Producer from '../models/Producer';

class AvatarController {
  async store(req, res) {
    const file = await File.create({
      name: req.file.filename,
    });

    if (req.type === 'Ece') {
      const ece = await Ece.findById(req.userId);
      ece.avatar_id = file._id;
      await ece.save();

      return res.json({ url: file.url });
    }

    const producer = await Producer.findById(req.userId);
    producer.avatar_id = file._id;
    await producer.save();

    return res.json({ url: file.url });
  }
}

export default new AvatarController();
