import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, signup, User } from "@/network/auth";

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export const loginUser = createAsyncThunk<LoginResponse, LoginCredentials>(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await login(credentials);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Login failed");
    }
  }
);

export const signupUser = createAsyncThunk<User, SignupData>(
  "auth/signupUser",
  async (signupData, { rejectWithValue }) => {
    try {
      const user = await signup(signupData);
      return user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Signup failed");
    }
  }
);
