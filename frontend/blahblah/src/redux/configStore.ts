import { configureStore } from "@reduxjs/toolkit";
import user from "./modules/user";
import feed from "./modules/feed";
import profile from "./modules/profile";
import subscribe from "./modules/subscribe";
const store = configureStore({
  reducer: {
    user,
    feed,
    profile,
    subscribe,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

