import User from "<@>/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
  data: {
    AppUserId: 0,
    Email: "",
    FullName: "",
    ProfilePicture: "",
    PhoneNumber: "",
    TelegramUsername: "",
    Country: "",
    ShortBio: "",
    University: "",
    Department: "",
    GraduationYear: "",
    LeetCode: "",
    GitHub: "",
    Codeforces: "",
    Hackerrank: "",
    LinkedIn: "",
    Cv: null,
    FavoriteLanguage: "",
    GroupId: 0,
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
