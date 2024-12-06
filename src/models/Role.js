import mongoose from "mongoose";

const UserRoleSchema = new mongoose.Schema({
  role_name: {
    type: String,
    required: true,
    trim: true,
  },
  role_status: {
    type: String,
    required: true,
    trim: true,
  },
  privileges: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Privilege",
    },
  ],
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
UserRoleSchema.pre('save', function (next) {
  this.update_date = Date.now();
  next();
});

// Prevents model recompilation if already compiled
export default mongoose.models.Role || mongoose.model("Role", UserRoleSchema);
