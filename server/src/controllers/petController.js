const cloudinary = require("../utils/cloudinary");
const QRCode = require("qrcode");
const Pet = require("../models/petModel");
const User = require("../models/userModel");

const addPet = async (req, res) => {
  try {
    const {
      name,
      breed,
      age,
      gender,
      imageUrl,
      vaccinations,
      allergies,
      dietaryNotes,
    } = req.body;

    const owner = req.body.id;

    const qrCodeId = owner + "-" + Date.now();
    const qrCodeData = await QRCode.toDataURL(qrCodeId);

    const uploadResponse = await cloudinary.uploader.upload(qrCodeData, {
      folder: "vetTag/qrcodes",
    });

    const newPet = new Pet({
      owner,
      name,
      breed,
      age,
      gender,
      imageUrl,
      vaccinations,
      allergies,
      dietaryNotes,
      qrCodeId,
      qrCodeImage: uploadResponse.secure_url,
      lastSeenLocation: {
        type: "Point",
        coordinates: [77.5946, 12.9716],
      },
    });

    await newPet.save();

    await User.findByIdAndUpdate(owner, { $push: { pets: newPet._id } });

    res.status(201).json({ message: "Pet added successfully", pet: newPet });
  } catch (error) {
    console.error("Add pet error:", error);
    res.status(500).json({ message: "Server error adding pet" });
  }
};

module.exports = { addPet };
