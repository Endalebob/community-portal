import User from "<@>/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import exp from "constants";

const initialState: User = {
  data: {
    id: 0,
    name: "",
    email: "",
    phoneNumber: "",
    telegramHandle: "",
    country: "",
    shortBio: "",
    profilePicture: "",
    university: "",
    department: "",
    yearOfGraduation: "",
    leetcodeUsername: "",
    githubUsername: "",
    codeforcesUsername: "",
    hackerrankUsername: "",
    linkedinUrl: "",
    cv: "",
    programmingLanguage: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
