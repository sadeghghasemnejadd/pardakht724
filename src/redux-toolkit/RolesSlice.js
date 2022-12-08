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
export const getRole = createAsyncThunk("getRole", async (id) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.get(`/roles/${id}`, {
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
export const updateRole = createAsyncThunk("getRole", async (values) => {
  try {
    console.log({ ...values.updateData });
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.patch(
      `/roles/${values.id}`,
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
});
const allRoles = (res) => res.payload.roles;
const oneRole = (res) => res.payload.role;
export const RolesSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    roles: [],
    role: [],
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
    ///////////////////////////////////////
    [getRole.pending]: (state) => {
      state.loading = true;
    },
    [getRole.fulfilled]: (state, action) => {
      state.loading = false;
      state.role = oneRole(action);
    },
    [getRole.rejected]: (state) => {
      state.loading = false;
    },
    //////////////////////////////////////
    [updateRole.pending]: (state) => {
      state.loading = true;
    },
    [updateRole.fulfilled]: (state, action) => {
      state.loading = false;
      state.role = oneRole(action);
    },
    [updateRole.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default RolesSlice.reducer;
