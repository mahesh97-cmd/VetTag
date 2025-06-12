import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPhoneAlt, FaMapMarkerAlt, FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import toast from "react-hot-toast";

const UserProfile = () => {
  const dispatch=useDispatch()
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/user-profile`,
        { withCredentials: true }
      );
     if(res.status===200){
      dispatch(addUser(res.data))
      setUser(res.data);

     }
      setFormData({
        name: res.data.name || "",
        phone: res.data.phone || "",
        address: {
          street: res.data.address?.street || "",
          city: res.data.address?.city || "",
          state: res.data.address?.state || "",
          postalCode: res.data.address?.postalCode || "",
        },
      });
    } catch (err) {
      console.error("Failed to fetch profile", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["street", "city", "state", "postalCode"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user-editProfile`,
        formData,
        { withCredentials: true }
      );
     if(res.status===200){
      toast.success("Profile updated successfully")
       setUser(res.data.user);
      setEditMode(false);
     }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (!user) return <div className="text-center mt-10 text-cyan-700">Loading...</div>;

  return (
    <div className="  flex items-center justify-center ">
      <div className="w-full max-w-3xl  bg-white border border-white/30 shadow-2xl rounded-3xl p-8">

        <div className="text-center mb-8">

          <h2 className="text-3xl font-bold text-cyan-700 mt-2">My Profile</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-cyan-700 font-medium">Full Name</label>
            {editMode ? (
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-2 bg-white/60 border border-cyan-200 rounded-md focus:ring-2 focus:ring-cyan-400 outline-none transition"
              />
            ) : (
              <p className="text-gray-500 text-lg">{user.name.toUpperCase()}</p>
            )}
          </div>

          <div>
            <label className="block text-cyan-700 font-medium">Phone</label>
            {editMode ? (
              <input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-2 bg-white/60 border border-cyan-200 rounded-md focus:ring-2 focus:ring-cyan-400 outline-none transition"
              />
            ) : (
              <p className="text-gray-500 flex items-center gap-2 text-lg">
                <FaPhoneAlt className="text-gray-500" /> {user.phone || "-"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-cyan-700 font-medium mb-1">Address</label>
            {editMode ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="street"
                  placeholder="Street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  className="px-4 py-2 bg-white/60 border border-cyan-200 rounded-md focus:ring-2 focus:ring-cyan-400 outline-none transition"
                />
                <input
                  name="city"
                  placeholder="City"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  className="px-4 py-2 bg-white/60 border border-cyan-200 rounded-md focus:ring-2 focus:ring-cyan-400 outline-none transition"
                />
                <input
                  name="state"
                  placeholder="State"
                  value={formData.address.state}
                  onChange={handleInputChange}
                  className="px-4 py-2 bg-white/60 border border-cyan-200 rounded-md focus:ring-2 focus:ring-cyan-400 outline-none transition"
                />
                <input
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.address.postalCode}
                  onChange={handleInputChange}
                  className="px-4 py-2 bg-white/60 border border-cyan-200 rounded-md focus:ring-2 focus:ring-cyan-400 outline-none transition"
                />
              </div>
            ) : (
              <div className="text-gray-500 text-lg space-y-1">
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-cyan-700" />
                  {user.address?.street}
                </p>
                <p>{user.address?.city} {user.address?.state}</p>
                <p>{user.address?.postalCode}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-8 gap-4">
          {editMode ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-md shadow-md transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-white/70 hover:bg-white text-gray-800 px-6 py-2 border border-gray-300 rounded-md transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-md shadow-md transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
