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
	itemTotal: number;
	date_created: string;
	status: string;
  }
  
  export interface OrderAttributes {
      id: string;
      food_items: FoodDetails[];
      amount: number;
      status: string;
      userId: string;
      vendorId: string;
      isPaid: boolean;
      address: string;
	  
  }


  export interface InitialFoodState {
	Orders: FoodDetails[];
	is_Loading: boolean;
	error: string;
}

const initialState: InitialFoodState = {
	Orders: [],
	is_Loading: false,
	error: "",
};




  export const getUserOrders = createAsyncThunk(
   
	"all user orders",
	async (_, thunkAPI) => {
       // const vendorId = localStorage.getItem('vendorid')
        // const vendorId = "2bde1e91-9382-48cd-b39a-63229c93706b"   
	  try {
		const response = await axios.get(`/user/userGetsAllOrders`);
        console.log("MYYY", response.data)
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
  


export const userOrderSlice = createSlice({
	name: "userOders",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
	
		builder.addCase(getUserOrders.pending, (state) => {
			// Add user to the state array
			state.is_Loading = true;
			state.error = "";
		  });
		  builder.addCase(getUserOrders.fulfilled, (state, action) => {
			// Add user to the state array
			state.is_Loading = false;
			state.Orders = action.payload.data;
            //console.log('PAYLOAD',action.payload.data)
           // toast(action.payload.message);
			state.error = "";
		  });
		  builder.addCase(getUserOrders.rejected, (state, action) => {
			// Add user to the state array
			state.is_Loading = false;
			state.error = action.payload as string;
		  });
	},
});

// Action creators are generated for each case reducer function
export const { } = userOrderSlice.actions;

export default userOrderSlice.reducer;