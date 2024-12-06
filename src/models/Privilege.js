import mongoose from "mongoose";

const privilegeSchema = new mongoose.Schema({
  privilege_name: {
    type: String,
    required: true,
    trim: true,
  },
  privilege_description: {
    type: String,
    required: true,
    trim: true,
  },
  
  created_date: {
    type: Date,
    default: Date.now,
  },
  update_date: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the `update_date` field on each save operation
privilegeSchema.pre('save', function (next) {
  this.update_date = Date.now();
  next();
});

// Prevents model recompilation if already compiled
export default mongoose.models.Privilege || mongoose.model("Privilege", privilegeSchema);
