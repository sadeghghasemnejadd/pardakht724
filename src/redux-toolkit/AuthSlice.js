import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "utils/axios";

export const loginAdmin = createAsyncThunk("loginAdmin", async (values) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", values);

    return data.data;
  } catch (err) {
    throw err;
  }
});

export const loginConfirmKey = createAsyncThunk(
  "loginConfirmKey",
  async (values) => {
    try {
      const { data } = await axiosInstance.post("/auth/confirm-key", values);
      return data.data;
    } catch (err) {
      throw err;
    }
  }
);

export const myself = createAsyncThunk("myself", async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.get("/auth/myself", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (err) {
    throw err;
  }
});

export const logoutAdmin = createAsyncThunk("logoutAdmin", async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.get("/auth/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (err) {
    throw err;
  }
});

export const updateAdminPassword = createAsyncThunk(
  "updateAdminPassword",
  async (values) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.put(
        "/auth/update-password",
        values,
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

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    mainLoading: false,
    me: null,
  },
  extraReducers: {
    [loginAdmin.pending]: (state) => {
      state.loading = true;
    },
    [loginAdmin.fulfilled]: (state) => {
      state.loading = false;
    },
    [loginAdmin.rejected]: (state) => {
      state.loading = false;
    },

    // ------------------------------------------

    [loginConfirmKey.pending]: (state) => {
      state.loading = true;
    },
    [loginConfirmKey.fulfilled]: (state) => {
      state.loading = false;
    },
    [loginConfirmKey.rejected]: (state) => {
      state.loading = false;
    },

    // ------------------------------------------

    [myself.pending]: (state) => {
      state.mainLoading = true;
    },
    [myself.fulfilled]: (state, action) => {
      state.mainLoading = false;
      state.me = action.payload.user;
    },
    [myself.rejected]: (state) => {
      state.mainLoading = false;
      state.me = null;
    },

    // ------------------------------------------

    [logoutAdmin.pending]: (state) => {
      state.loading = true;
    },
    [logoutAdmin.fulfilled]: (state) => {
      state.loading = false;
    },
    [logoutAdmin.rejected]: (state) => {
      state.loading = false;
    },

    // ------------------------------------------

    [updateAdminPassword.pending]: (state) => {
      state.loading = true;
    },
    [updateAdminPassword.fulfilled]: (state) => {
      state.loading = false;
    },
    [updateAdminPassword.rejected]: (state) => {
      state.loading = false;
    },

    // ------------------------------------------
  },
});

export default AuthSlice.reducer;
