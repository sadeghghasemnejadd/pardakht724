import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "utils/axios";
export const getAllBaseServices = createAsyncThunk(
  "getAllBaseServices",
  async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(`/base-services`, {
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
export const searchBaseServices = createAsyncThunk(
  "searchBaseServices",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(`/base-services${value}`, {
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

const allBaseServices = (res) =>
  res.payload.base_services.map((b) => ({
    ...b,
    collapseData: {
      currencies: b.currencies,
      class_name: b.class_name,
      route_name: b.route_name,
    },
  }));

export const BaseServices = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    allBaseServices: [],
  },
  extraReducers: {
    [getAllBaseServices.pending]: (state) => {
      state.loading = true;
    },
    [getAllBaseServices.fulfilled]: (state, action) => {
      state.loading = false;
      state.allBaseServices = allBaseServices(action);
    },
    [getAllBaseServices.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [searchBaseServices.pending]: (state) => {
      state.loading = true;
    },
    [searchBaseServices.fulfilled]: (state, action) => {
      state.loading = false;
      state.allBaseServices = allBaseServices(action);
    },
    [searchBaseServices.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
  },
});

export default BaseServices.reducer;
