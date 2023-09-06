// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../api/httpService";

export interface VendorDetails {
    id?: string;
    email?: string;
    restaurant_name?: string;
    name_of_owner?: string;
    company_name?: string;
    password?: string;
    address?: string;
    phone_no?: string;
    isAvailable?: boolean;
    earnings?: number;
    revenue?: number;
    role?: string;
    salt?: string;
    cover_image?: string;
    rating?: number;
    orders?: number
}

export interface InitialVendorState {
	vendor: VendorDetails;
	isLoading: boolean;
	error: string;
}

const initialState: InitialVendorState = {
	vendor: {},
	isLoading: false,
	error: "",
};



export const getSingleVendor = createAsyncThunk(
   
	"singleVendor/getOneUser",
	async (_, thunkAPI) => {
        const vendorId = localStorage.getItem('vendorid')
        // const vendorId = "2bde1e91-9382-48cd-b39a-63229c93706b"

	  try {
		const response = await axios.get(`/user/getSingleVendor/${vendorId}`);
       // console.log("MY RESPONSE", response.data )
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
  


export const singelVendorSlice = createSlice({
	name: "vendorAuth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
	
		builder.addCase(getSingleVendor.pending, (state) => {
			// Add user to the state array
			state.isLoading = true;
			state.error = "";
		  });
		  builder.addCase(getSingleVendor.fulfilled, (state, action) => {
			// Add user to the state array
			state.isLoading = false;
			state.vendor = action.payload.data;
            //console.log(action.payload.data)
            //toast(action.payload.message);
			state.error = "";
		  });
		  builder.addCase(getSingleVendor.rejected, (state, action) => {
			// Add user to the state array
			state.isLoading = false;
			state.error = action.payload as string;
		  });
	},
});

// Action creators are generated for each case reducer function
export const { } = singelVendorSlice.actions;

export default singelVendorSlice.reducer;