// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
//import { toast } from "react-toastify";
import axios from "../api/httpService";

export interface FoodDetails {
    id?: string;
    order_count?: number,
    name?: string,
    date_created?: string,
    date_updated?: string,
    vendorId?: string,
    price?: number,
    food_image?: string,
    ready_time?: string,
    isAvailable?: boolean,
    description?: string,
    rating?: number,
    createdAt?: string,
    updatedAt?: string,
    VendorId?: null
}


export interface InitialFoodState {
	Foods: FoodDetails[];
	is_Loading: boolean;
	error: string;
}

const initialState: InitialFoodState = {
	Foods: [],
	is_Loading: false,
	error: "",
};



export const getVendorFoods = createAsyncThunk(
   
	"all foods/for avendor",
	async (_, thunkAPI) => {
        const vendorId = localStorage.getItem('vendorid')
        // const vendorId = "2bde1e91-9382-48cd-b39a-63229c93706b"   
	  try {
		const response = await axios.get(`/user/allvendorfoods/?id=${vendorId}`);
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

export const singleVendorFoodsSlice = createSlice({
	name: "vendorAuth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
	
		builder.addCase(getVendorFoods.pending, (state) => {
			// Add user to the state array
			state.is_Loading = true;
			state.error = "";
		  });
		  builder.addCase(getVendorFoods.fulfilled, (state, action) => {
			// Add user to the state array
			state.is_Loading = false;
			state.Foods = action.payload.data;
            //console.log('PAYLOAD',action.payload.data)
            //toast(action.payload.message);
			state.error = "";
		  });
		  builder.addCase(getVendorFoods.rejected, (state, action) => {
			// Add user to the state array
			state.is_Loading = false;
			state.error = action.payload as string;
		  });
	},
});

// Action creators are generated for each case reducer function
export const { } = singleVendorFoodsSlice.actions;

export default singleVendorFoodsSlice.reducer;