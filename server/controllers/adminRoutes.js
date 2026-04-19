import mongoose from 'mongoose';
import Photo from '../models/photo.js';

export const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const { userEmail, description, treeSpecies, latitude, longitude } = req.body;
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'photos' });
    const uploadStream = bucket.openUploadStream(req.file.originalname, { contentType: req.file.mimetype });

    uploadStream.end(req.file.buffer);

    uploadStream.on('error', (err) => {
      console.error('GridFS upload error:', err);
      res.status(500).json({ message: 'Upload failed' });
    });

    uploadStream.on('finish', async () => {
      // Find the uploaded file by filename, sorted by uploadDate to get the latest
      const files = await bucket.find({ filename: req.file.originalname }).sort({ uploadDate: -1 }).toArray();
      if (!files || files.length === 0) {
        return res.status(500).json({ message: 'Uploaded file not found' });
      }

      const file = files[0]; // most recent upload

      const newPhoto = new Photo({
        userEmail,
        description,
        treeSpecies,
        location: {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        },
        imageId: file._id,
      });

      const savedPhoto = await newPhoto.save();
      res.status(201).json(savedPhoto);
    });
  } catch (error) {
    console.error('Upload handler error:', error);
    res.status(500).json({ message: error.message });
  }
};






export const getPhoto= async (req, res)=> {
     try {
       const { userEmail } = req.query;
        const photos = await Photo.find({ userEmail }).select('-__v').lean();
    res.json(photos);
    } catch (error) {
        console.error("Mongoose fetch error:", error.message);
        res.status(409).json({ message: error.message });
    }
}


export const servePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const fileId = new mongoose.Types.ObjectId(id);

    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'photos',
    });

    // Find the file to get contentType
    const files = await bucket.find({ _id: fileId }).toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'File not found' });
    }

    const file = files[0];

    res.set('Content-Type', file.contentType);

    // Open download stream and pipe to response
    const downloadStream = bucket.openDownloadStream(fileId);
    downloadStream.pipe(res);

    downloadStream.on('error', (err) => {
      console.error('Error streaming file:', err);
      res.status(500).json({ message: 'Error streaming file' });
    });
  } catch (error) {
    console.error('Invalid file id:', error);
    res.status(400).json({ message: 'Invalid file id' });
  }
};

// export default {uploadPhoto, getPhoto}