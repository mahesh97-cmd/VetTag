import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaw, FaUpload } from "react-icons/fa";

const AddPets = () => {
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "Male",
    imageUrl: "",
    vaccinations: [],
    allergies: "",
    dietaryNotes: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const res = await fetch("/api/pets/add", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
        alert("Pet added successfully!");
        setFormData({
          name: "",
          breed: "",
          age: "",
          gender: "Male",
          imageUrl: "",
          vaccinations: [],
          allergies: "",
          dietaryNotes: "",
        });
        setImageFile(null);
      } else {
        alert(result.message || "Error adding pet");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6"
    >
      <h2 className="text-2xl font-bold text-cyan-700 mb-4 flex items-center gap-2">
        <FaPaw className="text-yellow-500" /> Add New Pet
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium">Pet Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 font-medium">Breed</label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          >
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Allergies (comma separated)</label>
          <input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Dietary Notes</label>
          <textarea
            name="dietaryNotes"
            value={formData.dietaryNotes}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            rows="3"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Pet Image</label>
          <div className="flex items-center gap-4 mt-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border p-2 rounded-lg"
            />
            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
          </div>
        </div>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          className="bg-cyan-700 text-white px-6 py-2 rounded-lg hover:bg-cyan-800 transition"
        >
          Add Pet
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddPets;
