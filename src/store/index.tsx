import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {createGroupApi} from "./group/group-api"
export const store = configureStore({
  reducer: {
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      createGroupApi.middleware
    );
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;