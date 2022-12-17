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
export const updateRolePermissions = createAsyncThunk(
  "updatePermission",
  async (values) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.post(
        values.updatePath,
        {
          ...values.updateData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.data;
    } catch (err) {
      throw err;
    }
  }
);

const allPermissions = (res) => res.payload.permissions;

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
      state.loading = false;
      state.allPermissions = allPermissions(action);
    },
    [getAllPermissions.rejected]: (state) => {
      state.loading = false;
    },
    /////////////////////////////////////
    [updateRolePermissions.pending]: (state) => {
      state.loading = true;
    },
    [updateRolePermissions.fulfilled]: (state) => {
      state.loading = false;
    },
    [updateRolePermissions.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default PermissionsSlice.reducer;
