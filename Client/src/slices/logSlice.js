import { createSlice } from "@reduxjs/toolkit";

const logSlice = createSlice({
  name: "logs",
  initialState: {
    acknowledgmentLogs: [],
  },
  reducers: {
    setLogs: (state, action) => {
      state.acknowledgmentLogs = action.payload;
    },
    addLog: (state, action) => {
      state.acknowledgmentLogs.push(action.payload);
    },
  },
});

export const { setLogs, addLog } = logSlice.actions;
export default logSlice.reducer;
