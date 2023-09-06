// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import axios from "../api/httpService";

export interface SingleUserDetails {
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
  singleUser: SingleUserDetails[];  
  token: string;
  isAuthenticated: boolean;
  error: string;
}

const initialState: InitialState = {
     singleUser: [], 
  token: "",
  isAuthenticated: false,
  error: "",
};

export const getSingleUser = createAsyncThunk(
  "singleUser/getOneUser",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/user/singleuser");
    //   localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
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



export const getSingleUserSlice = createSlice({
  name: "singleUser",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getSingleUser.pending, (state) => {
      // Add user to the state array
      state.isAuthenticated = false;
      state.error = "";
    });
    builder.addCase(getSingleUser.fulfilled, (state, action) => {
      // Add user to the state array
      state.isAuthenticated = true;
      state.singleUser = action.payload.data;
      state.token = action.payload.token;

      state.error = "";
    });
    builder.addCase(getSingleUser.rejected, (state, action) => {
      // Add user to the state array
      state.isAuthenticated = false;
      state.error = action.payload as string;
    });

  },
});

// Action creators are generated for each case reducer function


export default getSingleUserSlice.reducer;
