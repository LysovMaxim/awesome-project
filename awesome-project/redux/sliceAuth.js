import { createSlice } from "@reduxjs/toolkit";

const state = {
  userRegister: false,
  email: null,
  password: null,
  login: null,
  imageUser: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    addUser: (state, { payload }) => {
      return (state = {
        ...state,
        email: payload.email,
        password: payload.password,
        login: payload.login,
        imageUser: payload.imageUser,
        userRegister: payload.userRegister,
        userId: payload.userId,
      });
    },
    loginUser: (state, { payload }) => {
      return (state = {
        ...state,
        email: payload.email,
        password: payload.password,
        userId: userId,
        userRegister: true,
      });
    },
    signOut: () => state,
  },
});

export const authReducer = authSlice.reducer;

export const { addUser, loginUser, signOut } = authSlice.actions;
