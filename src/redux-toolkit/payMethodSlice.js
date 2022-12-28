import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "utils/axios";
export const getAllPayMethods = createAsyncThunk(
  "getAllPayMethods",
  async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(`/pay-methods`, {
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
export const searchPayMethods = createAsyncThunk(
  "getAllPayMethods",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(`/pay-methods${value}`, {
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

const payMethods = (res) =>
  res.payload.pay_methods.map((p) => ({
    ...p,
    collapseData: {
      id: p.id,
      account_identifier: p.account_identifier,
      merchant_id: p.merchant_id,
      access_type: p.access_type,
      call_back_url: p.call_back_url,
      call_back_url2: p.call_back_url2,
      max_capability: p.max_capability,
      description: p.description,
    },
  }));
export const PayMethodSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    payMethods: [],
  },
  extraReducers: {
    [getAllPayMethods.pending]: (state) => {
      state.loading = true;
    },
    [getAllPayMethods.fulfilled]: (state, action) => {
      state.loading = false;
      state.payMethods = payMethods(action);
    },
    [getAllPayMethods.rejected]: (state) => {
      state.loading = false;
    },
    //////////////////////////////////////
    [searchPayMethods.pending]: (state) => {
      state.loading = true;
    },
    [searchPayMethods.fulfilled]: (state, action) => {
      state.loading = false;
      state.payMethods = payMethods(action);
    },
    [searchPayMethods.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default PayMethodSlice.reducer;
