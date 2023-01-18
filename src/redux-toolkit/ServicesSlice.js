import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "utils/axios";
export const getAllServices = createAsyncThunk("getAllServices", async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.get(`/services`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (err) {
    throw err;
  }
});
export const getService = createAsyncThunk("getService", async (value) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.get(`/services/${value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (err) {
    throw err;
  }
});
export const searchServices = createAsyncThunk(
  "searchServices",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(`/services${value}`, {
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
const allServices = (res) => res.payload.services;
const service = (res) => res.payload.service;
export const Services = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    services: [],
    Service: [],
  },
  extraReducers: {
    [getAllServices.pending]: (state) => {
      state.loading = true;
    },
    [getAllServices.fulfilled]: (state, action) => {
      state.loading = false;
      state.services = allServices(action);
    },
    [getAllServices.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [getService.pending]: (state) => {
      state.loading = true;
    },
    [getService.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action);
      state.service = service(action);
    },
    [getService.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [searchServices.pending]: (state) => {
      state.loading = true;
    },
    [searchServices.fulfilled]: (state, action) => {
      state.loading = false;
      state.services = allServices(action);
    },
    [searchServices.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
  },
});

export default Services.reducer;
