// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { toast } from "react-toastify";
import axios from "../api/httpService";

export interface AllFoodDetails {
  id: string;
  order_count?: number;
  name?: string;
  date_created?: Date;
  date_updated?: Date;
  vendorId?: string;
  price?: number;
  food_image?: string;
  ready_time?: string;
  isAvailable?: boolean;
  rating?: number;
  description?: string;
}
export interface InitialState {
  allFoodCount: AllFoodDetails[];
  isLoading: boolean;
  token: string;
  isAuthenticated: boolean;
  error: string;
  message: string;
}
const initialState: InitialState = {
  allFoodCount: [],
  isLoading: false,
  token: "",
  isAuthenticated: false,
  error: "",
  message: "",
};

export const getAllFoodCount = createAsyncThunk(
  "allFoodCount/getAllFood",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/vendor/getallfood");
      localStorage.getItem(response.data.id)
      //localStorage.setItem("vendor", JSON.stringify(response.data.vendor));
      // localStorage.setItem("token", response.data.token);
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

export const getAllFoodCountSlice = createSlice({
  name: "allFoodCount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllFoodCount.pending, (state) => {
      // Add user to the state array
      state.isLoading = true;
      state.isAuthenticated = false;
      state.message = "";
      state.error = "";
    });
    builder.addCase(getAllFoodCount.fulfilled, (state, action) => {
      // Add user to the state array
      state.allFoodCount = action.payload.allFood;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.error = "";
      // toast.success(action.payload.message);
    });

    builder.addCase(getAllFoodCount.rejected, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.message = "";
      state.isAuthenticated = false;
      state.error = action.payload as string;
      // toast.error(action.payload as string);
    });
  },
});

// Action creators are generated for each case reducer function
//   export const { logout, loginSuccess } = popularFoodSlice.actions;

export default getAllFoodCountSlice.reducer;
