import mongoose from 'mongoose';

const studentsSchema = new mongoose.Schema({
  name: String,
  class: String
});

export default mongoose.models.Student || mongoose.model('Student', studentsSchema);
