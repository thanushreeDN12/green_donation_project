import mongoose from 'mongoose'


const photoSchema = mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  imageId: { type: mongoose.Schema.Types.ObjectId, required: true },
  
  description: {
    type: String,
    trim: true,
    default: ''
  },
  treeSpecies: {
    type: String,
    trim: true,
    default: ''
  },
   location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
        validate: {
          validator: function (value) {
            return (
              Array.isArray(value) &&
              value.length === 2 &&
              value[0] >= -180 &&
              value[0] <= 180 &&
              value[1] >= -90 &&
              value[1] <= 90
            );
          },
          message:
            "Coordinates must be [longitude, latitude] with valid ranges.",
        },
      },
    },
  uploadDate: {
    type: Date,
    default: Date.now  // Automatically set to current date/time on save
  }
});

export default mongoose.model('Photo', photoSchema)
