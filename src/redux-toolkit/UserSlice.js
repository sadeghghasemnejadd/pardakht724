import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "utils/axios";

export const allUsers = createAsyncThunk("allUser", async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.get(`/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (err) {
    throw err;
  }
});

export const searchUser = createAsyncThunk("searchUser", async (values) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.get(`/users${values}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (err) {
    throw err;
  }
});
export const getUserData = createAsyncThunk("getUserData", async (value) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.get(`/users/${value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (err) {
    throw err;
  }
});
const getUsers = (res) => {
  const currentUsers = res.payload.users.map((user) => ({
    ...user,
    approvals: [
      user.email_verified,
      user.national_id_verifying_status,
      user.selfie_agreement_verifying_status,
      user.home_phone_verified,
    ],
    full_name: `${user.first_name} ${user.last_name}`,
    actions: [user.id, user.is_employee],
  }));
  return currentUsers;
};
const getUser = (res) => res.payload.user;
export const UserSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    users: [],
    user: [],
  },
  extraReducers: {
    [searchUser.pending]: (state) => {
      state.loading = true;
    },
    [searchUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = getUsers(action);
    },
    [searchUser.rejected]: (state) => {
      state.loading = false;
    },
    [allUsers.pending]: (state) => {
      state.loading = true;
    },
    [allUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = getUsers(action);
    },
    [allUsers.rejected]: (state) => {
      state.loading = false;
    },
    [getUserData.pending]: (state) => {
      state.loading = true;
    },
    [getUserData.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = getUser(action);
    },
    [getUserData.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default UserSlice.reducer;
