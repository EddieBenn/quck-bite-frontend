import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import axios from "../api/httpService";

export interface FoodDetails {
    id: string;
    order_count?: number;
    name?: string;
    date_created?: Date;
    date_updated?: Date;
    vendorId?: string;
    price?: number;
    food_image?: string;
    ready_time?: string;
    isAvailable?: boolean;
    rating?: number;
    description?: string;
}

export interface InitialVendorState {
    vendorPopularFoods: FoodDetails[];
    token: string;
    isAuthenticated: boolean;
    isLoading: boolean
    error: string;
    message: string
}

const initialState: InitialVendorState = {
    vendorPopularFoods: [],
    token: "",
    isAuthenticated: false,
    error: "",
    isLoading: false,
    message: ""
};

export const getPopularFoods = createAsyncThunk(
    "vendorPopularFoods/getPopularFoods",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/vendor/popularfoods");
            //localStorage.setItem("vendor", JSON.stringify(response.data.user));
            // localStorage.setItem("token", response.data.token);
            console.log('data popular', response.data)
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

export const vendorPopularFoodsSlice = createSlice({
    name: "vendorPopularFoods",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getPopularFoods.pending, (state) => {
            // Add user to the state array
            state.isLoading = true;
            state.message = ""
            state.error = ""
        });
        builder.addCase(getPopularFoods.fulfilled, (state, action) => {
            state.vendorPopularFoods = action.payload.totalFoods
            state.message = action.payload.message
            state.error = "";
            // toast.success(action.payload.message)

        });

        builder.addCase(getPopularFoods.rejected, (state, action) => {
            // Add user to the state array
            state.isLoading = false;
            state.message = ""
            state.error = action.error as string;
            // toast.error(action.payload as string)
        });
    },
});

export default vendorPopularFoodsSlice.reducer;