import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roleList: null,
  userList: null,
  createUser: null,
  userRoles: null,
  user: null,
  userId: null,
  singleUserData: null,
  loading: false,
};

const User = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserList: (state, action) => {
      state.userList = action.payload;
    },
    setRoleList: (state, action) => {
      state.roleList = action.payload;
    },
    setCreateUser: (state, action) => {
      state.createUser = action.payload;
    },
    setUserRoles: (state, action) => {
      state.userRoles = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setSingleUserData: (state, action) => {
      state.userId = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setUser,
  setUserId,
  setUserList,
  setCreateUser,
  setUserRoles,
  setRoleList,
  setSingleUserData,
  setLoading,
} = User.actions;

export default User.reducer;
