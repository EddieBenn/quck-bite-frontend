// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import axios from "../api/httpService";


export interface OrderDetails {
  id: string;
  foodid?: string;
  food_name?: string;
  quantity?: number;
  amount?: number;
  status?: string;
  userId?: string;
  vendorId?: string;
  isPaid?: boolean
}
export interface InitialState {
  vendorOrder: OrderDetails[];
  isLoading: boolean
  token: string;
  isAuthenticated: boolean;
  error: string;
  message: string
}
const initialState: InitialState = {
  vendorOrder: [],
  isLoading: false,
  token: "",
  isAuthenticated: false,
  error: "",
  message: ""
}


export const getOrderCount = createAsyncThunk(
  "vendor/vendororders",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/vendor/vendororders");
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

export const getOrderCountSlice = createSlice({
  name: "totalFood",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getOrderCount.pending, (state) => {
      // Add user to the state array
      state.isLoading = true;
      state.isAuthenticated = false;
      state.message = ""
      state.error = ""
    });
    builder.addCase(getOrderCount.fulfilled, (state, action) => {
      // Add user to the state array
      state.vendorOrder = action.payload.foodArr;

      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.error = "";
      // toast.success(action.payload.message)
    });

    builder.addCase(getOrderCount.rejected, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.message = ""
      state.isAuthenticated = false;
      state.error = action.payload as string;
      // toast.error(action.payload as string)
    });
  },
});

// Action creators are generated for each case reducer function
//   export const { logout, loginSuccess } = popularFoodSlice.actions;

export default getOrderCountSlice.reducer;