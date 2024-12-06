import mongoose from 'mongoose';

const parentsSchema = new mongoose.Schema({
  name: String  
});

export default mongoose.models.Parent || mongoose.model('Parent', parentsSchema);
