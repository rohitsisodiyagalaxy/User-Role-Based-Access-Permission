import mongoose from 'mongoose';

// AuditLog schema with a reference to the User model
const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencing the User model
  timestamp: { type: Date, default: Date.now },
  details: { type: Object },  // Additional details about the action
});

export default mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema);
