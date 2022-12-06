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
export const searchRoles = createAsyncThunk("searchRoles", async (values) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.get(`/roles${values}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (err) {
    throw err;
  }
});
const allRoles = (res) =>
  res.payload.roles.map((role) => ({
    ...role,
    show: { isShow: true, id: role.id },
  }));
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
    ///////////////////////////////////////
    [searchRoles.pending]: (state) => {
      state.loading = true;
    },
    [searchRoles.fulfilled]: (state, action) => {
      state.loading = false;
      state.roles = allRoles(action);
    },
    [searchRoles.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default RolesSlice.reducer;
