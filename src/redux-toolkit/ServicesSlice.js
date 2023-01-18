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

const allServices = (res) => res.payload.services;

export const ServiceCategories = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    services: [],
  },
  extraReducers: {
    [getAllServices.pending]: (state) => {
      state.loading = true;
    },
    [getAllServices.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action);
      state.services = allServices(action);
    },
    [getAllServices.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
  },
});

export default ServiceCategories.reducer;
