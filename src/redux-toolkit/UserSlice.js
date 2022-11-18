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

export const UserSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
  },
  extraReducers: {
    [searchUser.pending]: (state) => {
      state.loading = true;
    },
    [searchUser.fulfilled]: (state) => {
      state.loading = false;
    },
    [searchUser.rejected]: (state) => {
      state.loading = false;
    },
    [allUsers.pending]: (state) => {
      state.loading = true;
    },
    [allUsers.fulfilled]: (state) => {
      state.loading = false;
    },
    [allUsers.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default UserSlice.reducer;
