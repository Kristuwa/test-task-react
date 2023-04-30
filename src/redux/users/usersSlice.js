import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const usersInitialState = { items: [] };

const usersSlice = createSlice({
  name: "users",
  initialState: usersInitialState,
  reducers: {
    addUsers(state, action) {
      state.items = action.payload;
    },
    updateUser(state, action) {
      for (const user of state.items) {
        if (user.id === action.payload) {
          user.following = !user.following;
          if (user.following) {
            user.followersCount = Number(user.followersCount) + 1;
          } else {
            user.followersCount = Number(user.followersCount) - 1;
          }
          break;
        }
      }
    },
  },
});

const persistConfig = {
  key: "users",
  storage,
};

const persistedUsersReducer = persistReducer(persistConfig, usersSlice.reducer);

export const { addUsers, updateUser } = usersSlice.actions;
export const usersReducer = persistedUsersReducer;
