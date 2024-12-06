import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
 
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role", // Reference to the Role model
    required: true,
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
UserSchema.pre('save', function (next) {
  this.update_date = Date.now();
  next();
});

// Prevents model recompilation if already compiled
export default mongoose.models.User || mongoose.model("User", UserSchema);
