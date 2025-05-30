import React, { useState } from "react";
import axios from "axios";

const vaccinationOptions = [
  "Rabies",
  "Parvo",
  "Distemper",
  "Hepatitis",
  "Leptospirosis",
];

export default function AddPet() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [allergies, setAllergies] = useState("");
  const [dietaryNotes, setDietaryNotes] = useState("");
  const [vaccinations, setVaccinations] = useState([]);
  const [newVaccineName, setNewVaccineName] = useState("");
  const [newVaccineDate, setNewVaccineDate] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleVaccinationChange = (e, index) => {
    const updated = [...vaccinations];
    updated[index].name = e.target.value;
    setVaccinations(updated);
  };

  const handleVaccinationDateChange = (e, index) => {
    const updated = [...vaccinations];
    updated[index].date = e.target.value;
    setVaccinations(updated);
  };

  const addVaccination = () => {
    if (newVaccineName && newVaccineDate) {
      setVaccinations([
        ...vaccinations,
        { name: newVaccineName, date: newVaccineDate },
      ]);
      setNewVaccineName("");
      setNewVaccineDate("");
    }
  };

  const removeVaccination = (index) => {
    setVaccinations(vaccinations.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !breed || !age || !gender) {
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("breed", breed);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("allergies", allergies);
    formData.append("dietaryNotes", dietaryNotes);
    formData.append("vaccinations", JSON.stringify(vaccinations));
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/addPet`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("Pet added successfully!");
        setName("");
        setBreed("");
        setAge("");
        setGender("");
        setAllergies("");
        setDietaryNotes("");
        setVaccinations([]);
        setImageFile(null);
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      alert("Server error: " + error.response?.data?.message || error.message);
    }
  };


  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Pet</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label className="block font-semibold">Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 w-full rounded mb-2"
          />
        </div>

        <div>
          <label className="block font-semibold">Breed *</label>
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
            className="border p-2 w-full rounded mb-2"
          />
        </div>

        <div>
          <label className="block font-semibold">Age *</label>
          <input
            type="number"
            min="0"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="border p-2 w-full rounded mb-2"
          />
        </div>

        <div>
          <label className="block font-semibold">Gender *</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="border p-2 w-full rounded mb-2"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">Vaccinations</label>

          {vaccinations.map((v, i) => (
            <div key={i} className="flex gap-2 items-center mb-2">
              <select
                value={v.name}
                onChange={(e) => handleVaccinationChange(e, i)}
                className="border p-2 rounded flex-1"
              >
                {vaccinationOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={v.date}
                onChange={(e) => handleVaccinationDateChange(e, i)}
                className="border p-2 rounded"
                required
              />

              <button
                type="button"
                onClick={() => removeVaccination(i)}
                className="text-red-600 font-bold"
                title="Remove vaccination"
              >
                &times;
              </button>
            </div>
          ))}

          <div className="flex gap-2 items-center mt-2">
            <input
              type="text"
              placeholder="Vaccine Name"
              value={newVaccineName}
              onChange={(e) => setNewVaccineName(e.target.value)}
              className="border p-2 rounded flex-1"
              list="vaccines-list"
            />
            <datalist id="vaccines-list">
              {vaccinationOptions.map((opt) => (
                <option key={opt} value={opt} />
              ))}
            </datalist>

            <input
              type="date"
              value={newVaccineDate}
              onChange={(e) => setNewVaccineDate(e.target.value)}
              className="border p-2 rounded"
            />

            <button
              type="button"
              onClick={addVaccination}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Add
            </button>
          </div>
        </div>

        <div className="mt-4">
          <label className="block font-semibold mb-2">Pet Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="border p-2 rounded"
          />
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Pet
          </button>
        </div>
      </form>
    </div>
  );
}
