import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
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
    vendorEarning: VendorDetails[];
    token: string;
    isAuthenticated: boolean;
    isLoading: boolean
    error: string;
    message: string
}

const initialState: InitialVendorState = {
    vendorEarning: [],
    token: "",
    isAuthenticated: false,
    error: "",
    isLoading: false,
    message: ""
};

export const getVendorEarnings = createAsyncThunk(
    "vendorEarnings/getTotalEarnings",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/vendor/totalearnings");
            //localStorage.setItem("vendor", JSON.stringify(response.data.user));
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

export const totalEarningSlice = createSlice({
    name: "vendorEarning",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getVendorEarnings.pending, (state) => {
            // Add user to the state array
            state.isLoading = true;
            state.message = ""
            state.error = ""
        });
        builder.addCase(getVendorEarnings.fulfilled, (state, action) => {
            state.vendorEarning = action.payload.totalEarning
            state.message = action.payload.message
            state.error = "";
            // toast.success(action.payload.message)

        });

        builder.addCase(getVendorEarnings.rejected, (state, action) => {
            // Add user to the state array
            state.isLoading = false;
            state.message = ""
            state.error = action.error as string;
            // toast.error(action.payload as string)
        });
    },
});


export default totalEarningSlice.reducer;