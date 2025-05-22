const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  breed: { type: String },
  age: { type: Number },
  gender: { type: String, enum: ["Male", "Female"] },
  qrCodeId: { type: String, unique: true },
  qrCodeImage: { type: String }, 
 
  imageUrl: { type: String }, 
  vaccinations: [{ name: String, date: Date ,dueDate: Date}],
  allergies: [String],
  dietaryNotes: String,
  lost: { type: Boolean, default: false },
  lastSeenLocation: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number] }, 
  },
}, { timestamps: true });

petSchema.index({ lastSeenLocation: "2dsphere" });

module.exports = mongoose.model("Pet", petSchema);
