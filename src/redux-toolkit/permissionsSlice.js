import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "utils/axios";
export const getAllPermissions = createAsyncThunk(
  "getAllPermissions",
  async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(`/permissions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.data;
    } catch (err) {
      throw err;
    }
  }
);

const allPermissions = (res) => res.payload.roles;

export const PermissionsSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    allPermissions: [],
  },
  extraReducers: {
    [getAllPermissions.pending]: (state) => {
      state.loading = true;
    },
    [getAllPermissions.fulfilled]: (state, action) => {
      console.log(action);
      state.loading = false;
    },
    [getAllPermissions.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default PermissionsSlice.reducer;
