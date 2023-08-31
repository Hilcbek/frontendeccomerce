import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import product from "./product";
export default configureStore({
    reducer : {
        user : userReducer,
        product : product
    }
})