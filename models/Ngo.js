import mongoose from 'mongoose';

const ngoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    targetDonation: { type: String, required: true },
    collectedAmount: { type: String, required: true },
    livesImpacted: { type: String, required: true },
    noOfMembers: { type: String, required: true },
    sustainableDevelopmentGoals: { type: Array, required: true }
  }
);

const Ngo = mongoose.models.Ngo || mongoose.model('Ngo', ngoSchema,'ngos');
export default Ngo;
