import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/features/auth/authSlice";
import studentsReducer from "@/store/features/students/studentSlice";

export const store = configureStore({
  reducer: { auth: authReducer, students: studentsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;