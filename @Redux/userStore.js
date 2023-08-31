import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import ProductReducer from "./ProductReducer";

export default configureStore({
    reducer : {
        user : userReducer,
        product : ProductReducer
    }
})