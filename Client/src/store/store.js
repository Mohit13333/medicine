import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import medicineReducer from '../slices/medicineSlice';
import logReducer from '../slices/logSlice';
import globalReducer from '../slices/globalSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    medicines: medicineReducer,
    logs: logReducer,
    global: globalReducer, 
  },
});

export default store;
