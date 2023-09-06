/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../api/httpService";

export interface UserDetails {
  id?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  salt?: string;
  phone_no?: string;
  address?: string;
  otp?: number;
  otp_expiry?: string;
  verified?: boolean;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InitialState {
  user: UserDetails;
  data: [];
  
  token: string;
  isAuthenticated: boolean;
  error: string;
}

const initialState: InitialState = {
  user: {},
  data: [],
  token: "",
  isAuthenticated: false,
  error: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (payload: Record<string, string>, thunkAPI) => {
    try {
      const response = await axios.post("/user/login", payload);
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", response.data.token);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      if (error.request) {
        return thunkAPI.rejectWithValue("Network Error");
      }
      if (error.message) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/update-profile",
  async (payload: Record<string, string>, thunkAPI) => {
    try {
      const response = await axios.put("/user/editprofile", payload);
      localStorage.setItem("user", JSON.stringify(response.data))
      return response.data;
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      if (error.request) {
        return thunkAPI.rejectWithValue("Network Error");
      }
      if (error.message) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const getPopularFood = createAsyncThunk(
  "auth/popular-food",
  async () => {
    try {
      const response = await axios.get("/user/popularfoods");
      return response.data.user;
    } catch (error) {
      console.log(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {};
      state.isAuthenticated = false;
      state.token = "";
      window.location.href = "/";
      localStorage.clear();
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      // Add user to the state array
    //   state.isAuthenticated = false;
      state.error = "";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      // Add user to the state array
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      toast(action.payload.message);
      state.error = "";
    });
    builder.addCase(login.rejected, (state, action) => {
      // Add user to the state array
      state.isAuthenticated = false;
      state.error = action.payload as string;
    });
    builder.addCase(updateUserProfile.pending, (state) => {
      // Add user to the state array
      state.isAuthenticated = false;
      state.error = "";
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      // Add user to the state array
      const newUser = action.payload.data;
      state.user = action.payload.data;
      toast(action.payload.message);
   
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      // Add user to the state array
     
      state.error = action.payload as string;
    });

  },
});

// Action creators are generated for each case reducer function
export const { logout, loginSuccess } = authSlice.actions;

export default authSlice.reducer;
