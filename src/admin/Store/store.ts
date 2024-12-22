import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import AuthSlice from "./AuthSlice";
const store = configureStore({
  reducer: {
    data: dataSlice,
    Auth: AuthSlice,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
