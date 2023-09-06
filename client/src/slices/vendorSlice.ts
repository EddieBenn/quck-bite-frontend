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
	token: string;
	isAuthenticated: boolean;
	error: string;
}

const initialState: InitialVendorState = {
	vendor: {},
	token: "",
	isAuthenticated: false,
	error: "",
};

export const vendorLogin = createAsyncThunk(
	"vendorAuth/loginVendor",
	async (payload: Record<string, string>, thunkAPI) => {
		try {
			const response = await axios.post("/vendor/login", payload);

			localStorage.setItem("vendor", JSON.stringify(response.data.vendor));
			localStorage.setItem("id", JSON.stringify(response.data.vendor.id));
			// console.log("response", response.data.token)
			return response.data;
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

export const updateVendorProfile = createAsyncThunk(
	"vendor/update-profile",
	async (payload: Record<string, string>, thunkAPI) => {
		try {
			const response = await axios.put("/vendor/editprofile", payload);
			//console.log(response.data.data)
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

export const vendorAuthSlice = createSlice({
	name: "vendorAuth",
	initialState,
	reducers: {
		logout: (state) => {
			state.vendor = {};
			state.isAuthenticated = false;
			state.token = "";
			window.location.href = "/";
			localStorage.clear();
		},
		loginSuccess: (state, action) => {
			state.vendor = action.payload.vendor;
			state.token = action.payload.token;
			state.isAuthenticated = true;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(vendorLogin.pending, (state) => {
			// Add vendor to the state array
			state.isAuthenticated = false;
			state.error = "";
		});
		builder.addCase(vendorLogin.fulfilled, (state, action) => {
			// Add vendor to the state array
			state.isAuthenticated = true;
			state.vendor = action.payload.vendor;
			state.token = action.payload.token;
			localStorage.setItem("token", action.payload.token);
			toast(action.payload.message);
			state.error = "";
		});
		builder.addCase(vendorLogin.rejected, (state, action) => {
			// Add vendor to the state array
			state.isAuthenticated = false;
			state.error = action.payload as string;
		});
		builder.addCase(updateVendorProfile.pending, (state) => {
			// Add user to the state array
			state.isAuthenticated = false;
			state.error = "";
		});
		builder.addCase(updateVendorProfile.fulfilled, (state, action) => {
			// Add user to the state array
			const newVendor = action.payload;
			state.vendor = newVendor;
			toast(action.payload.message);
			localStorage.setItem("vendor",JSON.stringify(newVendor))
		});
		builder.addCase(updateVendorProfile.rejected, (state, action) => {
			// Add user to the state array
			state.isAuthenticated = false;
			state.error = action.payload as string;
		});
	},
});

// Action creators are generated for each case reducer function
export const { logout, loginSuccess } = vendorAuthSlice.actions;

export default vendorAuthSlice.reducer;