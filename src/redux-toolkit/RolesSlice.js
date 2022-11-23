import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "utils/axios";
export const getAllRoles = createAsyncThunk("getAllRoles", async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.get(`/roles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (err) {
    throw err;
  }
});

const allRoles = (res) => res.payload.roles;
export const RolesSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    roles: [],
  },
  extraReducers: {
    [getAllRoles.pending]: (state) => {
      state.loading = true;
    },
    [getAllRoles.fulfilled]: (state, action) => {
      state.loading = false;
      state.roles = allRoles(action);
    },
    [getAllRoles.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default RolesSlice.reducer;
