import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import Cookies from "js-cookie";

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:8085/registration', userData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (loginData, { rejectWithValue, dispatch }) => {
        try {
            const loginResponse = await axios.post('http://localhost:8085/login', loginData);
            const user = loginResponse.data;

            const userResponse = await axios.get(`http://localhost:8085/user?email=${loginData.email}`);
            const userData = userResponse.data;

            Cookies.set('userInfo', JSON.stringify(userData));
            dispatch(login({ email: user.email, name: user.name }));

            return user;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: "",
      email: "",
      authUser: false,
    },
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    login(state, action) {
      const { email, name } = action.payload;
      state.user = {
        ...state.user,
        email,
        name,
        authUser: true,
      };
      const saveState = JSON.stringify(state.user);
      sessionStorage.setItem("authUser", saveState);
    },
    logout(state) {
      state.user = {
        name: "",
        email: "",
        authUser: false,
      };
      sessionStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(registerUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.loading = false;
          state.message = action.payload;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = {
            ...state.user,
            ...action.payload,
            authUser: true,
          };
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
