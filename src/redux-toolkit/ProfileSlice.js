import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "utils/axios";

export const getProfile = createAsyncThunk("getProfile", async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.get("/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (err) {
    throw err;
  }
});

export const setNationalId = createAsyncThunk(
  "setNationalId",
  async (values) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.post(
        "/auth/profile/national-id",
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

export const setAgreement = createAsyncThunk("setAgreement", async (values) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.post(
      "/auth/profile/agreement",
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
});

export const setHomePhone = createAsyncThunk("setHomePhone", async (values) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.post(
      "/auth/profile/home-phone",
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
});

export const setConfirmHomePhone = createAsyncThunk(
  "setConfirmHomePhone",
  async (values) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.post(
        "/auth/profile/confirm-home-phone",
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

export const setAddress = createAsyncThunk("setAddress", async (values) => {
  try {
    const token = localStorage.getItem("token");
    console.log(values);
    const { data } = await axiosInstance.post("/auth/profile/address", values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (err) {
    throw err;
  }
});

export const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    profile: null,
  },
  extraReducers: {
    [getProfile.pending]: (state) => {
      state.loading = true;
    },
    [getProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.profile = action.payload.user;
    },
    [getProfile.rejected]: (state) => {
      state.loading = false;
    },

    // ------------------------------------------

    [setNationalId.pending]: (state) => {
      state.loading = true;
    },
    [setNationalId.fulfilled]: (state) => {
      state.loading = false;
    },
    [setNationalId.rejected]: (state) => {
      state.loading = false;
    },

    // ------------------------------------------

    [setAgreement.pending]: (state) => {
      state.loading = true;
    },
    [setAgreement.fulfilled]: (state) => {
      state.loading = false;
    },
    [setAgreement.rejected]: (state) => {
      state.loading = false;
    },

    // ------------------------------------------

    [setHomePhone.pending]: (state) => {
      state.loading = true;
    },
    [setHomePhone.fulfilled]: (state) => {
      state.loading = false;
    },
    [setHomePhone.rejected]: (state) => {
      state.loading = false;
    },

    // ------------------------------------------

    [setConfirmHomePhone.pending]: (state) => {
      state.loading = true;
    },
    [setConfirmHomePhone.fulfilled]: (state) => {
      state.loading = false;
    },
    [setConfirmHomePhone.rejected]: (state) => {
      state.loading = false;
    },

    // ------------------------------------------

    [setAddress.pending]: (state) => {
      state.loading = true;
    },
    [setAddress.fulfilled]: (state) => {
      state.loading = false;
    },
    [setAddress.rejected]: (state) => {
      state.loading = false;
    },

    // ------------------------------------------
  },
});

export default ProfileSlice.reducer;
