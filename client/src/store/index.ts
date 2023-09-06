import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import vendorReducer from "../slices/vendorSlice";
import popularRestaurantReducer from "../slices/popularRestaurantSlice";
import popularFoodReducer from "../slices/popularSlice";
import newFoodReducer from "../slices/newFoodsSlice";
import getAllFoodCountReducer from "../slices/getAllFoodCountSlice";
import getTotalFoodReducer from "../slices/popularFoodCountSlice";
import getOrderCountReducer from "../slices/orderCountSlice";
import userGetAllFoodReducer from "../slices/userGetAllFoodSlice";
import getSingleUserReducer from "../slices/getSingleUserProfileSlice";
import vendorGetProfileReducer from "../slices/vendorGetProfileSlice";
import totalRevenueReducer from "../slices/totalRevenueSlice";
import totalEarningReducer from "../slices/totalEarningSlice";
import totalOrderReducer from "../slices/totalOrdersSlice";
import vendorPopularFoodsReducer from "../slices/vendorPopularFoodsSlice";
import UserGetAllRestaurantReducer from "../slices/getAllRestaurantSlice";
import earningRevReducer from "../slices/earningRevSlice";
import vendorFoodsReducer from "../slices/vendorFoods";
import singleVendorReducer from "../slices/singleVendorSlice";
import singleVendorFoodsReducer from "../slices/vendorFoodsSlice";
import makeOrderReducer from "../slices/userCreateOrderSlice";
import geoProfileReducer from '../slices/geoProfileSlice'
import singleOrdersReducer from '../slices/orderSlice'
import userOrdersReducer from "../slices/userOrdersSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    vendorAuth: vendorReducer,
    popularFood: popularFoodReducer,
    popularRestaurant: popularRestaurantReducer,
    newFood: newFoodReducer,
    allFoodCount: getAllFoodCountReducer,
    totalFood: getTotalFoodReducer,
    vendorOrder: getOrderCountReducer,
    userAllFood: userGetAllFoodReducer,
    singleUser: getSingleUserReducer,
    vendorProfile: vendorGetProfileReducer,
    vendorRevenue: totalRevenueReducer,
    vendorEarning: totalEarningReducer,
    vendorOrders: totalOrderReducer,
    vendorPopularFood: vendorPopularFoodsReducer,
    allRestaurant: UserGetAllRestaurantReducer,
    earningRev: earningRevReducer,
    vendorFood: vendorFoodsReducer,
    getSingleVendor: singleVendorReducer,
    getVendorFoods: singleVendorFoodsReducer,
    order: makeOrderReducer,
    geoProfile: geoProfileReducer,
    getSingleOrder: singleOrdersReducer,
    userOrders: userOrdersReducer,

  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
