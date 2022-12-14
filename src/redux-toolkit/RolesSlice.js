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
export const addRole = createAsyncThunk("addRole", async (value) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.post(
      `/roles`,
      {
        ...value,
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
export const updateRole = createAsyncThunk("updateRole", async (values) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.patch(
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
});
export const updatePermission = createAsyncThunk(
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
      console.log(data.data);
      return data.data;
    } catch (err) {
      throw err;
    }
  }
);
export const getRolePermissions = createAsyncThunk(
  "getRolePermission",
  async (id) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(`/roles/${id}/permissions`, {
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
export const getRoleTasks = createAsyncThunk("getRoleTasks", async (id) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.get(`/roles/${id}/tasks`, {
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
const oneRole = (res) => res.payload.role;
const permissions = (res) => res.payload.role.permissions;
const allPermissions = (res) => res.payload.role.all_permissions;
const tasks = (res) => res.payload.role;
export const RolesSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    roles: [],
    role: [],
    allPermissions: [],
    permissions: [],
    tasks: [],
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
    ///////////////////////////////////////
    [addRole.pending]: (state) => {
      state.loading = true;
    },
    [addRole.fulfilled]: (state) => {
      state.loading = false;
    },
    [addRole.rejected]: (state) => {
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
    //////////////////////////////////////
    [updatePermission.pending]: (state) => {
      state.loading = true;
    },
    [updatePermission.fulfilled]: (state, action) => {
      state.loading = false;
      state.permissions = permissions(action);
    },
    [updatePermission.rejected]: (state) => {
      state.loading = false;
    },
    //////////////////////////////////////
    [getRolePermissions.pending]: (state) => {
      state.loading = true;
    },
    [getRolePermissions.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action);
      state.permissions = permissions(action);
      state.allPermissions = allPermissions(action);
    },
    [getRolePermissions.rejected]: (state) => {
      state.loading = false;
    },
    //////////////////////////////////////
    [getRoleTasks.pending]: (state) => {
      state.loading = true;
    },
    [getRoleTasks.fulfilled]: (state, action) => {
      state.loading = false;
      state.tasks = tasks(action);
    },
    [getRoleTasks.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default RolesSlice.reducer;
