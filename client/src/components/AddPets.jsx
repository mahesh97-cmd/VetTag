import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const vaccinationOptions = [
  "Rabies",
  "Parvo",
  "Distemper",
  "Hepatitis",
  "Leptospirosis",
];

export default function AddPet() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [allergies, setAllergies] = useState("");
  const [dietaryNotes, setDietaryNotes] = useState("");
  const [vaccinations, setVaccinations] = useState([]);
  const [newVaccineName, setNewVaccineName] = useState("");
  const [newVaccineDate, setNewVaccineDate] = useState("");
  const [newVaccineDueDate, setNewVaccineDueDate] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading,setLoading]=useState(false)

   useEffect(() => {
    console.log("Vaccinations updated:", vaccinations);
  }, [vaccinations]);

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

  const handleVaccinationDueDateChange = (e, index) => {
    const updated = [...vaccinations];
    updated[index].dueDate = e.target.value;
    setVaccinations(updated);
  };

  const addVaccination = () => {
    if (newVaccineName && newVaccineDate && newVaccineDueDate) {
      const newVaccine = {
        name: newVaccineName,
        date: newVaccineDate,
        dueDate: newVaccineDueDate,
      };
      setVaccinations((prev) => [...prev, newVaccine]);
      setNewVaccineName("");
      setNewVaccineDate("");
      setNewVaccineDueDate("");
    } else {
      alert("Please fill all vaccine fields (Name, Date, Due Date)");
    }
  };

  const removeVaccination = (index) => {
    setVaccinations(vaccinations.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !type || !breed || !age || !gender) {
      alert("Please fill all required fields");
      return;
    }
setLoading(true)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("breed", breed);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("allergies", allergies);
    formData.append("dietaryNotes", dietaryNotes);
    formData.append("vaccinations", JSON.stringify(vaccinations));
    if (imageFile) {
      formData.append("image", imageFile);
    }

    console.log("Submitting vaccinations:", vaccinations); 

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
        toast.success("Pet added successfully!");
        setName("");
        setType("");
        setBreed("");
        setAge("");
        setGender("Male");
        setAllergies("");
        setDietaryNotes("");
        setVaccinations([]);
        setImageFile(null);
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Server error: " + (error.response?.data?.message || error.message));
    }finally{
      setLoading(false)
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
          <label className="block font-semibold">Type *</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
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
            <option>Unknown</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Allergies</label>
          <input
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="border p-2 w-full rounded mb-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Dietary Notes</label>
          <input
            type="text"
            value={dietaryNotes}
            onChange={(e) => setDietaryNotes(e.target.value)}
            className="border p-2 w-full rounded mb-2"
          />
        </div>
       <div className="mb-4">
          <label className="block font-semibold mb-2">Vaccinations</label>
          {vaccinations.map((v, i) => (
            <div key={i} className="grid grid-cols-1 gap-2 mb-3 p-2 border rounded">
              <select
                value={v.name}
                onChange={(e) => handleVaccinationChange(e, i)}
                className="border p-2 rounded"
                required
              >
                <option value="">Select Vaccine</option>
                {vaccinationOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-semibold">Date</label>
                  <input
                    type="date"
                    value={v.date}
                    onChange={(e) => handleVaccinationDateChange(e, i)}
                    className="border p-2 rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold">Due Date</label>
                  <input
                    type="date"
                    value={v.dueDate}
                    onChange={(e) => handleVaccinationDueDateChange(e, i)}
                    className="border p-2 rounded w-full"
                    required
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeVaccination(i)}
                className="text-red-600 font-bold text-right"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-3 p-3 border rounded bg-gray-50">
            <h3 className="font-semibold mb-2">Add New Vaccine</h3>
            <input
              type="text"
              placeholder="Vaccine Name"
              value={newVaccineName}
              onChange={(e) => setNewVaccineName(e.target.value)}
              className="border p-2 rounded w-full mb-2"
              list="vaccines-list"
            />
            <datalist id="vaccines-list">
              {vaccinationOptions.map((opt) => (
                <option key={opt} value={opt} />
              ))}
            </datalist>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <label className="block text-sm font-semibold">Date</label>
                <input
                  type="date"
                  value={newVaccineDate}
                  onChange={(e) => setNewVaccineDate(e.target.value)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold">Due Date</label>
                <input
                  type="date"
                  value={newVaccineDueDate}
                  onChange={(e) => setNewVaccineDueDate(e.target.value)}
                  className="border p-2 rounded w-full"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={addVaccination}
              className="bg-blue-600 text-white px-3 py-2 rounded w-full"
            >
              Add Vaccine
            </button>
          </div>
        </div>
        <div className="mt-4">
          <label className="block font-semibold mb-2">Pet Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="border p-2 rounded w-full"
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
  disabled={loading}
  className={`px-4 py-2 rounded w-full ${
    loading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
  } text-white`}
>
  {loading ? 'Adding...' : 'Add Pet'}
</button>
        </div>
      </form>
    </div>
  );
}
