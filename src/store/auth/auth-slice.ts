import AuthState from "<@>/types/auth/auth-state";
import { getCookie, removeCookie, setCookie } from "<@>/utils/cookie";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  token: getCookie('token') || null, 
  isAuthenticated: Boolean(getCookie('token')),
  role: getCookie('role') || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<AuthState>) {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.role = action.payload.role;
      if (action.payload.token) {
        setCookie('token', action.payload.token, { expires: 1 });
      }
      if (action.payload.role) {
        setCookie('role', action.payload.role, { expires: 1 }); 
      }
    },
    clearToken(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.role = null; // Clear role
      removeCookie('token');
      removeCookie('role');
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
