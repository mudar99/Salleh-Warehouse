import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { loginAPI, logoutAPI, registerAPI } from "../../API";
import Cookies from 'universal-cookie';

const cookie = new Cookies();
export const userLogin = createAsyncThunk("storehouse/user/login", async (user, { rejectWithValue }) => {
  try {
    let { data } = await axios.post(loginAPI, user);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const userLogout = createAsyncThunk("storehouse/user/logout", async (token) => {
  axios.defaults.headers = {
    Authorization: `Bearer ${token}`,
  }
  const res = await axios.post(logoutAPI);
  // console.log(res);
  return res.data;
});

export const userRegister = createAsyncThunk("storehouse/user/register", async (user, { rejectWithValue }) => {
  try {
    let { data } = await axios.post(registerAPI, user);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: null,
    userToken: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    }).addCase(userLogin.fulfilled, (state, { payload }) => {
      if (payload.status === true) {
        localStorage.setItem("fname", payload.data.user.firstname);
        state.userToken = payload.data.accessToken;
        cookie.set('jwt_store', payload.data.accessToken,
        )
        window.location.href = "/";
      }
      state.loading = false;
    }).addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
    })

    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
    }).addCase(userRegister.fulfilled, (state, { payload }) => {
      if (payload.status === true) {
        console.log(payload)
        localStorage.setItem("fname", payload.data.user.firstname);
        state.userToken = payload.data.token;
        cookie.set('jwt_store', payload.data.token)
        window.location.href = "/";
      }
      state.loading = false;
    }).addCase(userRegister.rejected, (state, { payload }) => {

      state.loading = false;
    })

    builder.addCase(userLogout.fulfilled, (state, { payload }) => {
      // cookie.remove('jwt_store');
      if (payload.status === true) {
        state.userToken = null;
        cookie.remove('jwt_store');
        window.location.href = "/login";
      }
      state.loading = false;
    }).addCase(userLogout.rejected, (state) => {
      state.loading = false;
    })
  }

});

// export const { } = authSlice.actions;

export default authSlice.reducer;
