// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import axios from "../api/httpService";


export interface RestaurantDetails{
    id: string;
    email?: string;
    restaurant_name?: string;
    name_of_owner?: string;
    company_name: string;
    password: string;
    address?: string;
    phone_no?: string;
    isAvailable: boolean;
    earnings: number;
    revenue: number;
    role: string;
    salt: string;
    cover_image?: string;
    rating: number;
    orders: number
   
}
export interface InitialState {	
      popularRestaurant: RestaurantDetails[];	
	isLoading: boolean
	error: string;
    message:string
  }
  const initialState:InitialState={
     popularRestaurant:[],
     isLoading:false,
     error:"",
     message: ""
  } 
 
  
  export const getPopularRestaurant = createAsyncThunk(
    "popularRestaurant/getPopularRestaurant",
    async (_, thunkAPI) => {
      try {
        const response = await axios.get("/user/getPopularVendors");
        return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
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
  
  export const popularRestaurantSlice = createSlice({
    name: "popularRestaurant",
    initialState,
    reducers: {},
    extraReducers: (builder) => {  
     
      builder.addCase(getPopularRestaurant.pending, (state) => {
        // Add user to the state array
        state.isLoading = true;
        state.message = ""
        state.error =""
      });
      builder.addCase(getPopularRestaurant.fulfilled, (state, action) => {
        // Add user to the state array
         state.popularRestaurant = action.payload.data
         state.message = action.payload.message
         state.isLoading = false
        state.error = "";
        // toast.success(action.payload.message)

      });
  
      builder.addCase(getPopularRestaurant.rejected, (state, action) => {
        // Add user to the state array
        state.isLoading = false;
        state.message = ""
        state.error = action.payload as string;
        // toast.error(action.payload as string) 
      });
    },
  });
  
  // Action creators are generated for each case reducer function
//   export const { logout, loginSuccess } = popularFoodSlice.actions;
  
  export default popularRestaurantSlice.reducer;