import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import medicineReducer from '../slices/medicineSlice';
import logReducer from '../slices/logSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    medicine: medicineReducer,
    logs: logReducer,
  },
});

export default store;
