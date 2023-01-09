import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "utils/axios";
export const getAllTasks = createAsyncThunk("getAllTasks", async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.get(`/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (err) {
    throw err;
  }
});
export const updateTasks = createAsyncThunk("updateTasks", async (value) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.patch(
      `/tasks/${value.id}`,
      {
        ...value.data,
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
export const updateRoleTasks = createAsyncThunk(
  "updateRoleTasks",
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
export const searchTasks = createAsyncThunk("searchTasks", async (values) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.get(`/tasks${values}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (err) {
    throw err;
  }
});
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
const allTasks = (res) =>
  res.payload.tasks.map((task) => ({
    ...task,
    description_subject: [task.description, task.subject_types],
  }));
const allPermissions = (res) => res.payload.permissions;
export const TaskSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    allTasks: [],
    permissions: [],
  },
  extraReducers: {
    [getAllTasks.pending]: (state) => {
      state.loading = true;
    },
    [getAllTasks.fulfilled]: (state, action) => {
      state.loading = false;
      state.allTasks = allTasks(action);
    },
    [getAllTasks.rejected]: (state) => {
      state.loading = false;
    },
    /////////////////////////////////////
    [searchTasks.pending]: (state) => {
      state.loading = true;
    },
    [searchTasks.fulfilled]: (state, action) => {
      state.loading = false;
      state.allTasks = allTasks(action);
    },
    [searchTasks.rejected]: (state) => {
      state.loading = false;
    },
    /////////////////////////////////////
    [updateTasks.pending]: (state) => {
      state.loading = true;
    },
    [updateTasks.fulfilled]: (state) => {
      state.loading = false;
    },
    [updateTasks.rejected]: (state) => {
      state.loading = false;
    },
    /////////////////////////////////////
    [updateRoleTasks.pending]: (state) => {
      state.loading = true;
    },
    [updateRoleTasks.fulfilled]: (state) => {
      state.loading = false;
    },
    [updateRoleTasks.rejected]: (state) => {
      state.loading = false;
    },
    /////////////////////////////////////
    [getAllPermissions.pending]: (state) => {
      state.loading = true;
    },
    [getAllPermissions.fulfilled]: (state, action) => {
      state.loading = false;
      state.permissions = allPermissions(action);
    },
    [getAllPermissions.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default TaskSlice.reducer;
