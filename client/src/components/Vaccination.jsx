import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addVaccination } from "../utils/petSlice";
import toast from "react-hot-toast";
const Vaccination = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { petId } = useParams();
  const navigate = useNavigate();

  const [petData, setPetData] = useState(state?.petData || null);
  const [vaccinations, setVaccinations] = useState(petData?.vaccinations || []);
  const [newVaccine, setNewVaccine] = useState({ name: "", date: "", dueDate: "" });
console.log(petId,"pet id")
  

  const fetchPetData = async () => {
    try {
      const { data, status } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/singlePet/${petId}`,
        { withCredentials: true }
      );
      console.log(data.pet,"data of pet")
      if (status === 200) {
        setPetData(data.pet);
        setVaccinations(data.pet?.vaccinations ?? []);
      }
    } catch (err) {
      console.error("Error fetching pet data:", err);
      navigate("/dashboard/mypets");
    }
  };
useEffect(() => {
   fetchPetData()
  }, []);
  const handleAddVaccine = async () => {
    if (!newVaccine.name || !newVaccine.date) {
      return alert("Name and date are required");
    }
    try {
      const { data, status } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/pet/vaccination/${petData._id}`,
        newVaccine,
        { withCredentials: true }
      );
      console.log(data,"handle vaccination")
      if (status === 200) {
        toast.success("Vaccination added successfully")
        const updated = data.pet.vaccinations;
        setVaccinations(updated);
        dispatch(addVaccination({ petId: petData.id, vaccination: updated.at(-1) }));
        setNewVaccine({ name: "", date: "", dueDate: "" });
        alert("Vaccination added!");
      }
    } catch (err) {
      console.error("Failed:", err);
      alert("Failed to add vaccination.");
    }
  };

  if (!petData) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-cyan-700 mb-6">
        Vaccinations for {petData.name}
      </h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Current Vaccinations</h2>
        {vaccinations.length > 0 ? (
          <div className="space-y-4">
            {vaccinations.map((vax, idx) => (
              <div key={idx} className="border p-4 rounded-lg bg-gray-50">
                <p className="font-medium">{vax.name}</p>
                <p className="text-sm">
                  Given: {new Date(vax.date).toLocaleDateString()}
                </p>
                {vax.dueDate && (
                  <p className="text-sm">
                    Due: {new Date(vax.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No vaccinations recorded yet.</p>
        )}
      </div>

      <div className="bg-cyan-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Vaccination</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {["name", "date", "dueDate"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1">
                {field === "name" ? "Vaccine Name *" : field === "date" ? "Date Given *" : "Due Date"}
              </label>
              <input
                type={field === "name" ? "text" : "date"}
                value={newVaccine[field]}
                onChange={(e) => setNewVaccine({ ...newVaccine, [field]: e.target.value })}
                className="w-full p-2 border rounded"
                required={field !== "dueDate"}
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleAddVaccine}
          className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition"
        >
          Add Vaccination
        </button>
      </div>
    </div>
  );
};

export default Vaccination;
