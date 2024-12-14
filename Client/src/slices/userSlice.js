import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: !!localStorage.getItem("token"),
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
