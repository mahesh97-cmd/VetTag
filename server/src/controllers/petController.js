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

    const owner = req.user.id;

    const qrCodeId = `${owner}-${Date.now()}`;
    const qrCodeUrl = `https://vetTag.com/pet/${qrCodeId}`;

    const qrCodeData = await QRCode.toDataURL(qrCodeUrl);

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

const getPetsByUserId = async (req, res) => {
  try {
    const userId = req.user.id;

    const pets = await Pet.find({ owner: userId }).populate(
      "owner",
      "name phone email"
    );
    if (!pets || pets.length === 0) {
      return res.status(404).json({ message: "No pets found." });
    }
    res.status(200).json({ pets });
  } catch (error) {
    console.error("Error fetching pets:", error);
    res.status(500).json({ message: "Server error fetching pets." });
  }
};

const updatePetDetails = async (req, res) => {
  try {
    const { petId } = req.params;
    const {
      name,
      breed,
      age,
      gender,
      imageUrl,
      vaccinations,
      allergies,
      dietaryNotes,
      lost,
      lastSeenCoordinates,
    } = req.body;

    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found." });
    }

    if (pet.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this pet." });
    }

    const updatedFields = {
      ...(name && { name }),
      ...(breed && { breed }),
      ...(age && { age }),
      ...(gender && { gender }),
      ...(imageUrl && { imageUrl }),
      ...(vaccinations && { vaccinations }),
      ...(allergies && { allergies }),
      ...(dietaryNotes && { dietaryNotes }),
      ...(typeof lost === "boolean" && { lost }),
      ...(lastSeenCoordinates && {
        lastSeenLocation: {
          type: "Point",
          coordinates: lastSeenCoordinates,
        },
      }),
    };

    const updatedPet = await Pet.findByIdAndUpdate(
      petId,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedPet) {
      return res.status(404).json({ message: "Pet not found." });
    }

    res
      .status(200)
      .json({ message: "Pet updated successfully", pet: updatedPet });
  } catch (error) {
    console.error("Error updating pet:", error);
    res.status(500).json({ message: "Server error updating pet." });
  }
};

const getSinglepet = async (req, res) => {
  try {
    const { petId } = req.params;
    const userId = req.user.id;
    const pet = await Pet.findById(petId).populate("owner", "name email phone");
    if (!pet) {
      return res.status(404).json({ message: "Pet Not Found" });
    }
    if (pet.owner.id.toString() !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }
    res.status(200).json({ pet });
  } catch (error) {
    console.error("Error fetching pet:", error);
    res.status(500).json({ message: "Server error fetching pet" });
  }
};

const deletePet = async (req, res) => {
  try {
    const { petId } = req.params;
    const userId = req.user.id;

    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    if (pet.owner.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this pet" });
    }

    await Pet.findByIdAndDelete(petId);

    await User.findByIdAndUpdate(userId, { $pull: { pets: petId } });

    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (error) {
    console.error("Delete pet error:", error);
    res.status(500).json({ message: "Server error deleting pet" });
  }
};

const getLostPetsNearby = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res
        .status(400)
        .json({ message: "Latitude and Longitude are required." });
    }

    const pets = await Pet.find({
      lost: true,
      lastSeenLocation: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: 5000,
        },
      },
    }).populate("owner", "name phone email");

    res.status(200).json({ pets });
  } catch (error) {
    console.error("GeoQuery error:", error);
    res
      .status(500)
      .json({ message: "Server error fetching nearby lost pets." });
  }
};

const getPetByQrCodeId = async (req, res) => {
  try {
    const { qrCodeId } = req.params;

    const pet = await Pet.findOne({ qrCodeId }).populate(
      "owner",
      "name phone email"
    );

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.status(200).json({
      pet: {
        name: pet.name,
        imageUrl: pet.imageUrl,
        breed: pet.breed,
        age: pet.age,
        gender: pet.gender,
        owner: {
          name: pet.owner.name,
          phone: pet.owner.phone,
          email: pet.owner.email,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching pet by QR code:", error);
    res.status(500).json({ message: "Server error fetching pet" });
  }
};

const markPetAsLost = async (req, res) => {
  try {
    const { petId } = req.params;
    const userId = req.user.id;

    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found." });
    }

    if (pet.owner.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You are not the owner of this pet." });
    }

    pet.lost = true;
    await pet.save();

    res.status(200).json({ message: "Pet marked as lost.", pet });
  } catch (error) {
    console.error("Error marking pet as lost:", error);
    res.status(500).json({ message: "Server error marking pet as lost." });
  }
};

const addVaccination = async (req, res) => {
  try {
    const { petId } = req.params;
    const { name, date, dueDate } = req.body;

    if (!name || !date) {
      return res
        .status(400)
        .json({ message: "Vaccination name and date are required." });
    }

    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found." });
    }

    if (pet.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({
          message: "You are not authorized to add vaccination for this pet.",
        });
    }

    pet.vaccinations.push({
      name,
      date,
      dueDate,
    });

    await pet.save();

    res.status(200).json({ message: "Vaccination added successfully", pet });
  } catch (error) {
    console.error("Error adding vaccination:", error);
    res.status(500).json({ message: "Server error adding vaccination" });
  }
};


const markAsFound = async (req, res) => {
  try {
    const { petId } = req.params;
    const userId = req.user.id;

    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found." });
    }

    if (pet.owner.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You are not the owner of this pet." });
    }

    pet.lost = false;
    await pet.save();

    res.status(200).json({ message: "Pet marked as found.", pet });
  } catch (error) {
    console.error("Error marking pet as lost:", error);
    res.status(500).json({ message: "Server error marking pet as lost." });
  }
};


module.exports = {
  addPet,
  getPetsByUserId,
  updatePetDetails,
  getSinglepet,
  deletePet,
  getLostPetsNearby,
  getPetByQrCodeId,
  markPetAsLost,
  addVaccination,
  markAsFound
};
