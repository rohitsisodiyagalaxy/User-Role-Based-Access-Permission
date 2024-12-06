import mongoose from 'mongoose';

const teachersSchema = new mongoose.Schema({
  name: String,
  age: String,
  experience:String,
  gender:String,
  phone:String,
});

export default mongoose.models.Teacher || mongoose.model('Teacher', teachersSchema);
