import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  tokenNumber: {
    type: Number,
    required: true,
    unique: true
  },
  customerName: {
    type: String,
    required: true
  },
  serviceType: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Waiting", "In-Progress", "Completed"],
    default: "Waiting"
  },
  counterNumber: Number,
  issuedAt: {
    type: Date,
    default: Date.now
  },
  remarks: String,
  priorityLevel: {
    type: String,
    enum: ["Normal", "High", "Urgent"],
    default: "Normal"
  },
  contactNumber: String,
  estimatedWaitTime: Number
});

export default mongoose.model("Token", tokenSchema);
