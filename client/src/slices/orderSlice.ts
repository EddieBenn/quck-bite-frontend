import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../api/httpService";

// export interface Order {
//   id: string;
//   foodid: string;
//   food_name: string;
//   quantity: number;
//   amount: number;
//   status: string;
//   userId: string;
//   vendorId: string;
//   isPaid: boolean;
//   address: string;
// }

interface FoodDetails {
  name: string;
  description: string;
  id: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  food_items: FoodDetails[];
  amount: number;
  status: string;
  userId: string;
  vendorId: string;
  isPaid: boolean;
  address: string;
}

export interface InitialState {
  singleOrder: Order[];
  isLoading: boolean;
  error: string;
}

const initialState: InitialState = {
  singleOrder: [],
  isLoading: false,
  error: "",
};

// Async thunk for fetching order details
export const getSingleOrder = createAsyncThunk(
  "vendor/singleorder",
  async (_, thunkAPI) => {
    try {
      //   const orderId = localStorage.getItem("order");

      const orderId = "cb944210-c0a7-4938-88e8-3738a45032e6";

      const response = await axios.get(`/vendor/singleorder/?id=${orderId}`);
      localStorage.getItem(response.data.id);
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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleOrder.pending, (state) => {
      // Add user to the state array
      state.isLoading = true;
      state.error = "";
    });

    builder.addCase(getSingleOrder.fulfilled, (state, action) => {
      state.singleOrder = action.payload.data;
      state.isLoading = false;
    });

    builder.addCase(getSingleOrder.rejected, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.error = action.payload as string;
      toast.error(action.payload as string);
    });
  },
});

export default orderSlice.reducer;
