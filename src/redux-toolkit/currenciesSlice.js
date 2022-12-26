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
export const addCurrency = createAsyncThunk("addCurrency", async (value) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.post(
      `/currencies`,
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
export const getExchnageRate = createAsyncThunk(
  "getExchnageRate",
  async (id) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(
        `/currencies/${id}/exchange-rates`,
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
export const getHistories = createAsyncThunk("getHistories", async (id) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.get(`/currencies/${id}/histories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (err) {
    throw err;
  }
});
export const addExchangeRate = createAsyncThunk(
  "addExchangeRate",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.post(
        `/currencies/${value.id}/exchange-rates`,
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
  }
);
export const searchExchangeRate = createAsyncThunk(
  "searchExchangeRate",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(
        `/currencies/${value.id}/exchange-rates/${value.query}`,
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
export const updateCurrency = createAsyncThunk(
  "updateCurrency",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.patch(
        `/currencies/${value.id}`,
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
  }
);
export const updateExchangeRate = createAsyncThunk(
  "updateExchangeRate",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.patch(
        `/currencies/${value.id1}/exchange-rates/${value.id2}`,
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
const exchangeRates = (res) => res.payload.exchange_rates.data;
const histories = (res) => res.payload.currency_histories;
export const CurrenciesSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    currencies: [],
    exchangeRates: [],
    histories: [],
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
    ///////////////////////////////////////////////////
    [searchExchangeRate.pending]: (state) => {
      state.loading = true;
    },
    [searchExchangeRate.fulfilled]: (state, action) => {
      state.loading = false;
      state.exchangeRates = exchangeRates(action);
    },
    [searchExchangeRate.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [addCurrency.pending]: (state) => {
      state.loading = true;
    },
    [addCurrency.fulfilled]: (state) => {
      state.loading = false;
    },
    [addCurrency.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [getExchnageRate.pending]: (state) => {
      state.loading = true;
    },
    [getExchnageRate.fulfilled]: (state, action) => {
      state.loading = false;
      state.exchangeRates = exchangeRates(action);
    },
    [getExchnageRate.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [addExchangeRate.pending]: (state) => {
      state.loading = true;
    },
    [addExchangeRate.fulfilled]: (state) => {
      state.loading = false;
    },
    [addExchangeRate.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [getHistories.pending]: (state) => {
      state.loading = true;
    },
    [getHistories.fulfilled]: (state, action) => {
      state.loading = false;
      state.histories = histories(action);
    },
    [getHistories.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [updateCurrency.pending]: (state) => {
      state.loading = true;
    },
    [updateCurrency.fulfilled]: (state) => {
      state.loading = false;
    },
    [updateCurrency.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [updateExchangeRate.pending]: (state) => {
      state.loading = true;
    },
    [updateExchangeRate.fulfilled]: (state) => {
      state.loading = false;
    },
    [updateExchangeRate.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default CurrenciesSlice.reducer;
