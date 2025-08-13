import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "./authThunk";
import { AuthState, User } from "@/types/auth";
import { toast } from "sonner";

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
  signupSuccess:false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth(state) {
      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    loadFromStorage(state) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        state.token = token;
        state.user = JSON.parse(user);
      }
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
  state.loading = false;
  state.token = action.payload.token;
  state.user = action.payload.user;
 toast.success('Login Successfu.You Will Redirect To Dashboard ');
  localStorage.setItem("token", action.payload.token);
  localStorage.setItem("user", JSON.stringify(action.payload.user));

  // Store admin flag explicitly as string "true" or "false"
  const isAdmin = action.payload.user.isAdmin ? "true" : "false";
  localStorage.setItem("isAdmin", isAdmin);
});
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      toast.error('Login Rejected.Please try after some time. ');
    });

    // SIGNUP
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.signupSuccess=false
    });
    builder.addCase(signupUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading = false;
      // After signup, user might be logged in automatically or redirected to login
      // Here, we just set the user without token 
      state.user = action.payload;
      state.token = null;
      toast.success('SignUp successfully.');
      state.signupSuccess=true
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      toast.error('SignUp Rejected.Please try after some time. ');
      state.signupSuccess=false
    });
  },
});

export const { clearAuth, loadFromStorage } = authSlice.actions;
export default authSlice.reducer;
