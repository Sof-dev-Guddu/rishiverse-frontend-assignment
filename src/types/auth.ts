export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  signupSuccess:boolean;
  error: string | null;
}
