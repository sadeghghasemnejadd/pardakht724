import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "utils/axios";
export const getAllServiceCategories = createAsyncThunk(
  "getAllServiceCategories",
  async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(`/service-categories`, {
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
export const searchServiceCategories = createAsyncThunk(
  "searchServiceCategories",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(`/service-categories${value}`, {
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
export const addServiceCategories = createAsyncThunk(
  "addServiceCategories",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.post(
        `/service-categories`,
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
  }
);
export const updateServiceCategories = createAsyncThunk(
  "updateServiceCategories",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.patch(
        `/service-categories/${value.id}`,
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
export const getServices = createAsyncThunk(
  "updateServiceCategories",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(
        `/service-categories/${value}/services`,
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
export const updateServices = createAsyncThunk(
  "updateServices",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.patch(
        `/service-categories/${value.baseId}/services/${value.id}`,
        value.data,
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
export const removeServices = createAsyncThunk(
  "removeServices",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.delete(
        `/service-categories/${value.baseId}/services/${value.id}`,
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
export const addServices = createAsyncThunk("addServices", async (value) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.post(
      `/service-categories/${value.baseId}/services`,
      value.data,
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
export const searchServices = createAsyncThunk(
  "searchServices",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(
        `/service-categories/${value.id}/services/search${value.query}`,
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
const allServiceCategories = (res) =>
  res.payload.service_categories.map((s) => ({
    ...s,
    id_name: [s.id, s.name],
  }));
const services = (res) =>
  res.payload.services.map((s) => ({
    ...s,
    is_active_id: [s.is_active, s.id],
  }));
export const ServiceCategories = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    allServiceCategories: [],
    services: [],
  },
  extraReducers: {
    [getAllServiceCategories.pending]: (state) => {
      state.loading = true;
    },
    [getAllServiceCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.allServiceCategories = allServiceCategories(action);
    },
    [getAllServiceCategories.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [searchServiceCategories.pending]: (state) => {
      state.loading = true;
    },
    [searchServiceCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.allServiceCategories = allServiceCategories(action);
    },
    [searchServiceCategories.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [searchServices.pending]: (state) => {
      state.loading = true;
    },
    [searchServices.fulfilled]: (state, action) => {
      state.loading = false;
      state.services = services(action);
    },
    [searchServices.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [addServiceCategories.pending]: (state) => {
      state.loading = true;
    },
    [addServiceCategories.fulfilled]: (state) => {
      state.loading = false;
    },
    [addServiceCategories.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [updateServiceCategories.pending]: (state) => {
      state.loading = true;
    },
    [updateServiceCategories.fulfilled]: (state) => {
      state.loading = false;
    },
    [updateServiceCategories.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [getServices.pending]: (state) => {
      state.loading = true;
    },
    [getServices.fulfilled]: (state, action) => {
      state.loading = false;
      state.services = services(action);
    },
    [getServices.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [updateServices.pending]: (state) => {
      state.loading = true;
    },
    [updateServices.fulfilled]: (state) => {
      state.loading = false;
    },
    [updateServices.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [removeServices.pending]: (state) => {
      state.loading = true;
    },
    [removeServices.fulfilled]: (state) => {
      state.loading = false;
    },
    [removeServices.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
    [addServices.pending]: (state) => {
      state.loading = true;
    },
    [addServices.fulfilled]: (state) => {
      state.loading = false;
    },
    [addServices.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////////////////
  },
});

export default ServiceCategories.reducer;
