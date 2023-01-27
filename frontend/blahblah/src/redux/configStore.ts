import { configureStore } from "@reduxjs/toolkit";
import user from "./modules/user";
import feed from "./modules/feed";
const store = configureStore({
  reducer: {
    user,
    feed,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
