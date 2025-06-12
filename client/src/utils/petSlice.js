// src/redux/slices/petSlice.js
import { createSlice } from '@reduxjs/toolkit';

const petSlice = createSlice({
  name: 'pets',
  initialState: {
    pets: [],
    loading: false,
    error: null,
  },
  reducers: {
    addPets(state, action) {
      state.pets = action.payload;
      console.log(state.pets,"petslice")
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    addVaccination(state, action) {
      const { petId, vaccination } = action.payload;
      const pet = state.pets.find((p) => p._id === petId);
      if (pet) {
        pet.vaccinations = pet.vaccinations || [];
        pet.vaccinations.push(vaccination);
      }
    },
  },
});

export const { addPets, setLoading, setError,addVaccination } = petSlice.actions;
export default petSlice.reducer;
