import User from "<@>/types/auth/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: User;
}

const initialState: UserState = {
  user: {
  appUserId: 0,
  email: "",
  fullName: "",
  profilePicture: "",
  phoneNumber: "",
  telegramUsername: "",
  country: "",
  shortBio: "",
  university: "",
  department: "",
  graduationYear: "",
  leetCode: "",
  gitHub: "",
  codeforces: "",
  hackerrank: "",
  linkedIn: "",
  cv: null,
  favoriteLanguage: "",
  groupId: 0,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    }
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
