import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "utils/axios";

export const allUsers = createAsyncThunk("allUser", async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.get(`/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (err) {
    throw err;
  }
});

export const searchUser = createAsyncThunk("searchUser", async (values) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.get(`/users${values}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (err) {
    throw err;
  }
});
export const getUserData = createAsyncThunk("getUserData", async (value) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.get(`/users/${value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (err) {
    throw err;
  }
});
export const getNationalId = createAsyncThunk(
  "getNationalId",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(
        `/users/${value}/profile/national-id`,
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
export const getSelfieAgreemnet = createAsyncThunk(
  "getSelfieAgreemnet",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(
        `/users/${value}/profile/selfie-agreement`,
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
export const getUserRoles = createAsyncThunk("getUserRoles", async (value) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.get(`/users/${value}/roles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (err) {
    throw err;
  }
});
export const addUserRoles = createAsyncThunk("addUserRoles", async (value) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.post(
      `/users/${value.id}/roles`,
      { role_id: value.roleId },
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
export const removeUserRoles = createAsyncThunk(
  "removeUserRoles",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.delete(
        `/users/${value.userId}/roles/${value.roleId}`,
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
export const checkNationalId = createAsyncThunk(
  "acceptNationalId",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.post(
        `/users/${value.id}/profile/national-id`,
        { is_confirmed: value.confirmed, reject_description: value.message },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return data.data;
    } catch (err) {
      throw err;
    }
  }
);
export const checkSelfieAgreement = createAsyncThunk(
  "checkSelfieAgreement",
  async (value) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.post(
        `/users/${value.id}/profile/selfie-agreement`,
        { is_confirmed: value.confirmed, reject_description: value.message },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return data.data;
    } catch (err) {
      throw err;
    }
  }
);
export const setEmployee = createAsyncThunk("setEmployee", async (value) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.post(
      "/users/set-employee",
      { user_id: value, set_employee: true },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return data.data;
  } catch (err) {
    throw err;
  }
});
const getUsers = (res) => {
  const currentUsers = res.payload.users.map((user) => ({
    ...user,
    approvals: [
      user.email_verified,
      user.national_id_verifying_status,
      user.selfie_agreement_verifying_status,
      user.home_phone_verified,
    ],
    full_name: `${user.first_name} ${user.last_name}`,
    actions: [user.id, user.is_employee],
  }));
  return currentUsers;
};
const getUser = (res) => res.payload.user;
const nationalId = (res) => res.payload.national_id;
const selfieAgreemnt = (res) => res.payload.selfie_agreement;
const userRoles = (res) => res.payload.roles;
export const UserSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    users: [],
    user: [],
    nationalIdData: [],
    selfie: [],
    userRoles: [],
  },
  extraReducers: {
    ///////////////////////////////////////
    [searchUser.pending]: (state) => {
      state.loading = true;
    },
    [searchUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = getUsers(action);
    },
    [searchUser.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////
    [allUsers.pending]: (state) => {
      state.loading = true;
    },
    [allUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = getUsers(action);
    },
    [allUsers.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////
    [getUserData.pending]: (state) => {
      state.loading = true;
    },
    [getUserData.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = getUser(action);
    },
    [getUserData.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////
    [getNationalId.pending]: (state) => {
      state.loading = true;
    },
    [getNationalId.fulfilled]: (state, action) => {
      state.loading = false;
      state.nationalIdData = nationalId(action);
    },
    [getNationalId.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////
    [checkNationalId.pending]: (state) => {
      state.loading = true;
    },
    [checkNationalId.fulfilled]: (state) => {
      state.loading = false;
    },
    [checkNationalId.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////
    [getSelfieAgreemnet.pending]: (state) => {
      state.loading = true;
    },
    [getSelfieAgreemnet.fulfilled]: (state, action) => {
      state.loading = false;
      state.selfie = selfieAgreemnt(action);
    },
    [getSelfieAgreemnet.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////
    [checkSelfieAgreement.pending]: (state) => {
      state.loading = true;
    },
    [checkSelfieAgreement.fulfilled]: (state) => {
      state.loading = false;
    },
    [checkSelfieAgreement.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////
    [getUserRoles.pending]: (state) => {
      state.loading = true;
    },
    [getUserRoles.fulfilled]: (state, action) => {
      state.loading = false;
      state.userRoles = userRoles(action);
    },
    [getUserRoles.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////
    [addUserRoles.pending]: (state) => {
      state.loading = true;
    },
    [addUserRoles.fulfilled]: (state) => {
      state.loading = false;
    },
    [addUserRoles.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////
    [removeUserRoles.pending]: (state) => {
      state.loading = true;
    },
    [removeUserRoles.fulfilled]: (state) => {
      state.loading = false;
    },
    [removeUserRoles.rejected]: (state) => {
      state.loading = false;
    },
    ///////////////////////////////////////
    [setEmployee.pending]: (state) => {
      state.loading = true;
    },
    [setEmployee.fulfilled]: (state) => {
      state.loading = false;
    },
    [setEmployee.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default UserSlice.reducer;
