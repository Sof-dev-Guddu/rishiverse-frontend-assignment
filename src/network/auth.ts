import apiClient from "./apiClient";

interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface LoginResponse {
  token: string;
  user: User;
}

export const signup = async (data: SignupData): Promise<User> => {
  const response = await apiClient.post("/api/auth/signup", data);
  return response.data;
};

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await apiClient.post("/api/auth/login", data);
  return response.data;
};
