import {
  createAsyncThunk,
  createSlice,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
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
export const addBaseService = createAsyncThunk(
  "addBaseService",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.post(
        `/base-services`,
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
      if (!err.response) {
        throw err;
      }
      return err.response;
    }
  }
);
export const updateBaseService = createAsyncThunk(
  "updateBaseService",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.patch(
        `/base-services/${value.id}`,
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

const allBaseServices = (res) =>
  res.payload.base_services.map((b) => ({
    ...b,
    collapseData: {
      currencies: b.currencies,
      class_name: b.class_name,
      route_name: b.route_name,
    },
  }));
const allCurrencies = (res) => res.payload.currencies.data;

export const BaseServices = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    allBaseServices: [],
    allCurrencies: [],
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
    [getAllCurrencies.pending]: (state) => {
      state.loading = true;
    },
    [getAllCurrencies.fulfilled]: (state, action) => {
      state.loading = false;
      state.allCurrencies = allCurrencies(action);
    },
    [getAllCurrencies.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [addBaseService.pending]: (state) => {
      state.loading = true;
    },
    [addBaseService.fulfilled]: (state) => {
      state.loading = false;
    },
    [addBaseService.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [updateBaseService.pending]: (state) => {
      state.loading = true;
    },
    [updateBaseService.fulfilled]: (state) => {
      state.loading = false;
    },
    [updateBaseService.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default BaseServices.reducer;
