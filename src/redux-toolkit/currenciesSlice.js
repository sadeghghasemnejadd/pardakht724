import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "utils/axios";
export const getAllCurrencies = createAsyncThunk(
  "getAllCurrencies",
  async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(`/currencies`, {
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
export const searchCurrency = createAsyncThunk(
  "searchCurrency",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(`/currencies${value}`, {
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

const allCurrencies = (res) =>
  res.payload.currencies.data.map((c) => ({
    ...c,
    name_with_symbol: [c.name, c.symbol],
    collapse_data: [
      c.type,
      c.absolute_volume,
      c.real_volume,
      c.available_volume,
      c.base_currency,
      c.auto_update,
    ],
  }));

export const CurrenciesSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    currencies: [],
  },
  extraReducers: {
    [getAllCurrencies.pending]: (state) => {
      state.loading = true;
    },
    [getAllCurrencies.fulfilled]: (state, action) => {
      state.loading = false;
      state.currencies = allCurrencies(action);
    },
    [getAllCurrencies.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [searchCurrency.pending]: (state) => {
      state.loading = true;
    },
    [searchCurrency.fulfilled]: (state, action) => {
      state.loading = false;
      state.currencies = allCurrencies(action);
    },
    [searchCurrency.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default CurrenciesSlice.reducer;
