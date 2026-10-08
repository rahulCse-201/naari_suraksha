import mongoose from 'mongoose';

const emergencyIncidentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    latitude: {
      type: Number,
      required: [true, 'Latitude is required']
    },
    longitude: {
      type: Number,
      required: [true, 'Longitude is required']
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'RESOLVED', 'CANCELLED'],
      default: 'ACTIVE',
      index: true
    }
  },
  {
    timestamps: true
  }
);

const EmergencyIncident = mongoose.model('EmergencyIncident', emergencyIncidentSchema);
export default EmergencyIncident;
