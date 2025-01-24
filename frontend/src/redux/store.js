import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/reduxAuth';
import {userReducer, usersReducer } from "../features/userDetails/userDetails"
import allSampleReducer from "../features/sample/sampleApis"

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    user: userReducer,
    users: usersReducer,
    AllSample: allSampleReducer
  },
});
