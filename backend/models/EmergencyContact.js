import mongoose from 'mongoose';

const emergencyContactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Contact name is required'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Contact phone number is required'],
      trim: true
    },
    relationship: {
      type: String,
      required: [true, 'Relationship is required'],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const EmergencyContact = mongoose.model('EmergencyContact', emergencyContactSchema);
export default EmergencyContact;
