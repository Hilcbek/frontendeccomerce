import {createSlice} from '@reduxjs/toolkit'

let userSlice = createSlice({
    name : 'user',
    initialState : {
        id : JSON.parse(localStorage.getItem("id")) || null,
        username : JSON.parse(localStorage.getItem("username")) || null,
        isAdmin : JSON.parse(localStorage.getItem("isAdmin")) || null,
        profile : JSON.parse(localStorage.getItem("profile")) || null,
        reload : true
    },
    reducers : {
        LOGIN : (state,action) => {
            state.id = action.payload.id
            state.isAdmin = action.payload.isAdmin
            state.profile = action.payload.profile
            state.username = action.payload.username
            state.reload = action.payload.reload
            localStorage.setItem("id",JSON.stringify(action.payload.id))
            localStorage.setItem("isAdmin",JSON.stringify(action.payload.isAdmin))
            localStorage.setItem("profile",JSON.stringify(action.payload.profile))
            localStorage.setItem("username",JSON.stringify(action.payload.username))
        },
        LOGOUT : (state,action) => {
            localStorage.clear()
            state.reload = false
        }
    }
})
export let { LOGIN, LOGOUT } = userSlice.actions;
export default userSlice.reducer