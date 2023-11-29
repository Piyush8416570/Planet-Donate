import mongoose from 'mongoose';

const contributorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    donation: { type: Array, required: true }
  }
);

const Contributor = mongoose.models.Contributor || mongoose.model('Contributor', contributorSchema,'contributors');
export default Contributor;
