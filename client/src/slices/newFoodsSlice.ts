// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import axios from "../api/httpService";


export interface NewFoodDetails{
	id: string;
    order_count: number;
    name: string;
    date_created: Date;
    date_updated: Date;
    vendorId: string;
    price: number;
    food_image: string;
    ready_time: string;
    isAvailable: boolean;
    rating: number;   
    description: string;
   
}
export interface InitialState {	
      newFood: NewFoodDetails[];	
	isLoading: boolean
	error: string;
    message:string
  }
  const initialState:InitialState={
     newFood:[],
     isLoading:false,
     error:"",
     message: ""
  } 
 
  
  export const getNewFoods = createAsyncThunk(
    "newFood/getNewFood",
    async (_, thunkAPI) => {
      try {
        const response = await axios.get("/user/getNewFoods");
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
  
  export const newFoodSlice = createSlice({
    name: "newFood",
    initialState,
    reducers: {},
    extraReducers: (builder) => {  
     
      builder.addCase(getNewFoods.pending, (state) => {
        // Add user to the state array
        state.isLoading = true;
        state.message = ""
        state.error =""
      });
      builder.addCase(getNewFoods.fulfilled, (state, action) => {
        // Add user to the state array
         state.newFood = action.payload.data
         state.message = action.payload.message
         state.isLoading = false
        state.error = "";
        // toast.success(action.payload.message)

      });
  
      builder.addCase(getNewFoods.rejected, (state, action) => {
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
  
  export default newFoodSlice.reducer;