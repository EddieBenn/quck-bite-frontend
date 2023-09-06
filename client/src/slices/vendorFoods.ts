// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../api/httpService";

export interface NewFoodDetails {
  id: string;  
order_count: number;  
  name: string;
  date_created: Date;
  date_updated: Date;
  vendorId: string;
  price: number;
  food_image: string;
  ready_time: string;
  isAvailable: boolean;
  rating: number;
  description: string;
}
export interface InitialState {
  vendorFood: NewFoodDetails[];
  isLoading: boolean;
  error: string;
  message: string;
}
const initialState: InitialState = {
  vendorFood: [],
  isLoading: false,
  error: "",
  message: "",
};

export const getVendorFood = createAsyncThunk(
  "vendorFood/getVendorFood",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/vendor/getallfood");
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

export const editVendorFood = createAsyncThunk(
  "vendor/editVendorFood",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (payload: Record<string, any>, thunkAPI) => {
    try {
      const foodid = localStorage.getItem('foodid')
      const response = await axios.put(
        `/vendor/editfood/${foodid}`,
        payload
      );
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

export const vendorFoodSlice = createSlice({
  name: "vendorFood",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVendorFood.pending, (state) => {
      // Add user to the state array
      state.isLoading = true;
      state.message = "";
      state.error = "";
    });
    builder.addCase(getVendorFood.fulfilled, (state, action) => {
      // Add user to the state array
      state.vendorFood = action.payload.allFood;
      //state.message = action.payload.message
      state.error = "";
      //toast.success(action.payload.message)
    });

    builder.addCase(getVendorFood.rejected, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.message = "";
      state.error = action.payload as string;
      //toast.error(action.payload as string)
    });

    builder.addCase(editVendorFood.pending, (state) => {
      // Add user to the state array
      state.isLoading = true;
      state.message = "";
      state.error = "";
    });
    builder.addCase(editVendorFood.fulfilled, (state, action) => {
      // Add user to the state array
      const currentFoodArray = state.vendorFood;
      const updatedFood = action.payload.updatedFood;
      const indexOfUpdatedFood = currentFoodArray.findIndex(
        (item) => item.id === updatedFood.id
      );
      currentFoodArray[indexOfUpdatedFood] = updatedFood;

      state.vendorFood = currentFoodArray;
      state.message = action.payload.message;
      state.error = "";
      toast.success(action.payload.message);
    });

    builder.addCase(editVendorFood.rejected, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.message = "";
      state.error = action.payload as string;
      //toast.error(action.payload as string)
    });
  },
});

// Action creators are generated for each case reducer function
//   export const { logout, loginSuccess } = popularFoodSlice.actions;

export default vendorFoodSlice.reducer;
