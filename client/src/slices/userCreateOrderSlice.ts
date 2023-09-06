// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../api/httpService";

interface FoodDetails {
    name: string;
    description: string;
    id: string
    price: number
    quantity: number
  }
  
  export interface OrderDetails {
      id: string;
      food_items: FoodDetails[];
	  cartTotal: number
      address: string
  }

export interface InitialOrderState {
	order: OrderDetails[];
	// token: string;
	// isAuthenticated: boolean;
	error: string;
}

const initialState: InitialOrderState = {
	order: [],
    error: ""
}

export const userCreateOrder = createAsyncThunk(
	"order/userOrders",
	async (payload: any, thunkAPI) => {
		try {
			const response = await axios.post("/user/makeorder", payload);
			// localStorage.setItem("vendor", JSON.stringify(response.data.vendor));
			// localStorage.setItem("id", JSON.stringify(response.data.vendor.id));
			// console.log("response", response.data.token)
			return response.data.order;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error.response) {
				console.log(error.response)
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

export const userOrderDetails = createSlice({
	name: "order",
	initialState,
	reducers: {
		createOrder: (state, action) => {
			state.order = action.payload.order;
			// state.token = action.payload.token;
			// state.isAuthenticated = true;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(userCreateOrder.pending, (state) => {
			// Add vendor to the state array
			// state.isAuthenticated = false;
			state.error = "";
		});
		builder.addCase(userCreateOrder.fulfilled, (state, action) => {
			state.order = action.payload.order;
			toast(action.payload.message);
			state.error = "";
		});
		builder.addCase(userCreateOrder.rejected, (state, action) => {
			state.error = action.payload as string;
		});
	},
});

// Action creators are generated for each case reducer function
export const { createOrder } = userOrderDetails.actions;

export default userOrderDetails.reducer;