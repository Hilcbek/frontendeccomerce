import { createSlice } from '@reduxjs/toolkit'

export let productSlice = createSlice({
    name : 'product',
    initialState : {
        products : [],
        quantity : 0,
        Total : 0,
        cart : false
    },
    reducers : {
        AddProduct : (state,action) => {
           if(state.products){
                let result = state.products.find((pro) => pro._id === action.payload._id)
                if(result){
                    result.quantity = result.quantity + action.payload.quantity
                    state.Total += action.payload.price * action.payload.quantity
                }else{
                    state.quantity += 1
                    state.products.push(action.payload)
                    state.Total += action.payload.price * action.payload.quantity
                }
           }
            state.cart = true
        },
        CloseCart : (state,action) => {
            state.cart = false
        },
        OpenCart : (state,action) => {
            state.cart = true
        },
        DeleteProduct : (state,action) => {
            let id = action.payload.id
            let price = state.products.find((pro) => pro._id === id)
            state.products = state.products.filter((pro) => pro._id !== id)
            state.Total = state.Total - price.price * price.quantity
        },
        Reset : (state,action) => {
            state.products = []
            state.Total = 0
            state.cart = false
            state.quantity = 0
        },
        Subtructe : (state,action) => {
            let result = state.products.find((pro) => pro._id === action.payload.id)
            if(result){
                if(result.quantity > 1){
                    result.quantity = result.quantity - 1
                    state.Total -= result.price
                }
            }
        },
        Add : (state,action) => {
            let result = state.products.find((pro) => pro._id === action.payload.id)
            if(result){
                result.quantity = result.quantity + 1
                state.Total += result.price
            }
        }
    }
})
export let { AddProduct, CloseCart, OpenCart, DeleteProduct,Reset,InnerChange,Subtructe, Add } = productSlice.actions
export default productSlice.reducer