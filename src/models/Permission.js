import mongoose from "mongoose";
const PermissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
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
PermissionSchema.pre('save', function (next) {
  this.update_date = Date.now();
  next();
});
// Prevents model recompilation if already compiled
export default mongoose.models.Permission || mongoose.model("Permission", PermissionSchema);
