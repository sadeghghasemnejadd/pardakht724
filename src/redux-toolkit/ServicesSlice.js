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
export const getServicesPlans = createAsyncThunk(
  "getServicesPlans",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(`/services/${value}/plans`, {
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
export const getServicesCategories = createAsyncThunk(
  "getServicesCategories",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(
        `/services/${value}/categories`,
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
export const getServicesCurrencies = createAsyncThunk(
  "getServicesCurrencies",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(
        `/services/${value}/currencies`,
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
export const addServicesPlans = createAsyncThunk(
  "addServicesPlans",
  async ({ id, addData }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.post(
        `/services/${id}/plans`,
        addData,
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
export const addServicesCurrencies = createAsyncThunk(
  "addServicesCurrencies",
  async ({ id, addData }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.post(
        `/services/${id}/currencies`,
        addData,
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
export const updateServicesPlans = createAsyncThunk(
  "updateServicesPlans",
  async ({ id, addData, planId }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.patch(
        `/services/${id}/plans/${planId}`,
        addData,
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
export const updateServicesCurrencies = createAsyncThunk(
  "updateServicesCurrencies",
  async ({ id, addData, currencyId }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.patch(
        `/services/${id}/currencies/${currencyId}`,
        addData,
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
export const searchPlans = createAsyncThunk(
  "searchPlans",
  async ({ id, query }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(
        `/services/${id}/plans${query}`,
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
export const searchCategories = createAsyncThunk(
  "searchCategories",
  async ({ id, query }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(
        `/services/${id}/categories${query}`,
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
export const searchCurrencies = createAsyncThunk(
  "searchCurrencies",
  async ({ id, query }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(
        `/services/${id}/currencies/search${query}`,
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
export const removeServicesCategory = createAsyncThunk(
  "removeServicesCategory",
  async ({ id, catId }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.delete(
        `/services/${id}/categories/${catId}`,
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

const allServices = (res) => res.payload.services;
const service = (res) => res.payload.service;
const plans = (res) => res.payload.plans;
const categories = (res) => res.payload.categories;
const currencies = (res) => res.payload.currencies;
const allCurrencies = (res) => res.payload.currencies.data;
export const Services = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    services: [],
    service: [],
    plans: [],
    categories: [],
    currencies: [],
    allCurrencies: [],
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
    [searchPlans.pending]: (state) => {
      state.loading = true;
    },
    [searchPlans.fulfilled]: (state, action) => {
      state.loading = false;
      state.plans = plans(action);
    },
    [searchPlans.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [searchCurrencies.pending]: (state) => {
      state.loading = true;
    },
    [searchCurrencies.fulfilled]: (state, action) => {
      state.loading = false;
      state.allCurrencies = currencies(action);
    },
    [searchCurrencies.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [searchCategories.pending]: (state) => {
      state.loading = true;
    },
    [searchCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.categories = categories(action);
    },
    [searchCategories.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [getServicesCategories.pending]: (state) => {
      state.loading = true;
    },
    [getServicesCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.categories = categories(action);
    },
    [getServicesCategories.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [getServicesCurrencies.pending]: (state) => {
      state.loading = true;
    },
    [getServicesCurrencies.fulfilled]: (state, action) => {
      state.loading = false;
      state.allCurrencies = currencies(action);
    },
    [getServicesCurrencies.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [getServicesPlans.pending]: (state) => {
      state.loading = true;
    },
    [getServicesPlans.fulfilled]: (state, action) => {
      state.loading = false;
      state.plans = plans(action);
    },
    [getServicesPlans.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
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
    [addServicesPlans.pending]: (state) => {
      state.loading = true;
    },
    [addServicesPlans.fulfilled]: (state) => {
      state.loading = false;
    },
    [addServicesPlans.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [addServicesCurrencies.pending]: (state) => {
      state.loading = true;
    },
    [addServicesCurrencies.fulfilled]: (state) => {
      state.loading = false;
    },
    [addServicesCurrencies.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [updateServicesPlans.pending]: (state) => {
      state.loading = true;
    },
    [updateServicesPlans.fulfilled]: (state) => {
      state.loading = false;
    },
    [updateServicesPlans.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [updateServicesCurrencies.pending]: (state) => {
      state.loading = true;
    },
    [updateServicesCurrencies.fulfilled]: (state) => {
      state.loading = false;
    },
    [updateServicesCurrencies.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [removeServicesCategory.pending]: (state) => {
      state.loading = true;
    },
    [removeServicesCategory.fulfilled]: (state) => {
      state.loading = false;
    },
    [removeServicesCategory.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
  },
});

export default Services.reducer;
