import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ApplicationStatus {
  readyForApplication: boolean;
}

const initialState: ApplicationStatus = { readyForApplication: false };

const journeySlice = createSlice({
  name: "applicationStatus",
  initialState,
  reducers: {
    setApplicationStatus(_state, action: PayloadAction<ApplicationStatus>) {
      return action.payload;
    },
  },
});

export const { setApplicationStatus } = journeySlice.actions;
export default journeySlice.reducer;
