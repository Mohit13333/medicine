import { createSlice } from "@reduxjs/toolkit";

const medicineSlice = createSlice({
  name: "medicine",
  initialState: {
    medicines: [],
  },
  reducers: {
    setMedicines: (state, action) => {
      state.medicines = action.payload;
    },
    addMedicine: (state, action) => {
      state.medicines.push(action.payload);
    },
    // updateMedicineInStore: (state, action) => {
    //   const index = state.medicines.findIndex(
    //     (medicine) => medicine._id === action.payload._id
    //   );
    //   if (index !== -1) {
    //     state.medicines[index] = action.payload;
    //   }
    // },
    // removeMedicine: (state, action) => {
    //   state.medicines = state.medicines.filter(
    //     (medicine) => medicine._id !== action.payload
    //   );
    // },
  },
});

export const {
  setMedicines,
  addMedicine,
  updateMedicineInStore,
  removeMedicine,
} = medicineSlice.actions;
export default medicineSlice.reducer;
