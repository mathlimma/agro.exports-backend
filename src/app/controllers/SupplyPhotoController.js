import File from '../models/File';
import Supply from '../models/Supply';

class SupplyPhotoController {
  async store(req, res) {
    const supply = await Supply.findById(req.params.id);

    const urls = [];
    for (const upload of req.files) {
      const file = await File.create({
        name: upload.filename,
      });
      supply.photos.push(file._id);
      await supply.save();
      urls.push(file.url);
    }

    return res.json(urls);
  }
}

export default new SupplyPhotoController();
