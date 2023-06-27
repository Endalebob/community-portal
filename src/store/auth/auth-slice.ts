import AuthResponse from "<@>/types/auth/auth-response";
import AuthState from "<@>/types/auth/auth-state";
import { getCookie, removeCookie, setCookie } from "<@>/utils/cookie";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  token: getCookie("token") || "",
  role: getCookie("role") || "",
  email: getCookie("email") || "",
  isAuthenticated: Boolean(getCookie("token")),
  profilePicture: getCookie("profilePicture") || "",
  fullName: getCookie("fullName") || "",
}


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<AuthResponse>) {
      state.token = action.payload.value.token;
      state.role = action.payload.value.user.role;
      state.email = action.payload.value.user.email;
      state.profilePicture = action.payload.value.user.profilePictureUrl;
      state.fullName = action.payload.value.user.fullName;
      state.isAuthenticated = true;
      setCookie("token", action.payload.value.token);
      setCookie("role", action.payload.value.user.role);
      setCookie("email", action.payload.value.user.email);
      setCookie("profilePicture", action.payload.value.user.profilePictureUrl);
      setCookie("fullName", action.payload.value.user.fullName);
    },

    clearToken(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.profilePicture = null;
      state.fullName = null;
      state.role = null;
      state.email = null;
      removeCookie("token");
      removeCookie("role");
      removeCookie("email");
      removeCookie("profilePicture");
      removeCookie("fullName");
    }
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
