import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SelectedContest {
  id: string | null;
}

const initialState: SelectedContest = { id: null };

const contestSlice = createSlice({
  name: "selectedContest",
  initialState,
  reducers: {
    setSelectedContest(_state, action: PayloadAction<SelectedContest>) {
      return action.payload;
    },
  },
});

export const { setSelectedContest } = contestSlice.actions;
export default contestSlice.reducer;

