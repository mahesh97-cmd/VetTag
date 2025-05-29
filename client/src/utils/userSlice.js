import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    isLoggedIn:false
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        addUser:(state,action)=>{
            state.user=action.payload,
            state.isLoggedIn=true
        },
        logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    }
})

export const {addUser,logout}=userSlice.actions
export default userSlice.reducer