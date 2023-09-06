import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import axios from "../api/httpService";

export interface VendorDetails {
    earnings?: number;
    revenue?: number;
}

export interface InitialVendorState {
    earningRevenue: VendorDetails[];
    token: string;
    isAuthenticated: boolean;
    isLoading: boolean
    error: string;
    message: string
}

const initialState: InitialVendorState = {
    earningRevenue: [],
    token: "",
    isAuthenticated: false,
    error: "",
    isLoading: false,
    message: ""
};

export const getEarningRevenue = createAsyncThunk(
    "earningRevenue/getEarningRevenue",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/vendor/earningsandrevenue");
            //localStorage.setItem("vendor", JSON.stringify(response.data.user));
            // localStorage.setItem("token", response.data.token);
            //console.log('value', response.data)
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

export const earningRevenueSlice = createSlice({
    name: "earningRevenue",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getEarningRevenue.pending, (state) => {
            // Add user to the state array
            state.isLoading = true;
            state.message = ""
            state.error = ""
        });
        builder.addCase(getEarningRevenue.fulfilled, (state, action) => {
            state.earningRevenue = action.payload.earningRevenueArray
            state.message = action.payload.message
            state.error = "";
            // toast.success(action.payload.message)

        });

        builder.addCase(getEarningRevenue.rejected, (state, action) => {
            // Add user to the state array
            state.isLoading = false;
            state.message = ""
            state.error = action.error as string;
            // toast.error(action.payload as string)
        });
    },
});


export default earningRevenueSlice.reducer;