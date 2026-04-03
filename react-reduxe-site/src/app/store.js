import { configureStore } from "@reduxjs/toolkit";
import uiReducer from '../features/ui/uiSlice';
import instrumentsReducer from '../features/instruments/instrumentsSlice';
import authReducer from '../features/auth/authSlice';
import { authMiddleware } from './authMiddleware';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        instruments: instrumentsReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware)
});