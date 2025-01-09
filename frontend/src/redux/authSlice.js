import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        User:null
    },
    reducers:{
        setAuthUser:(state, action)=>{
            state.user = action.payload;
        }
    }
});

export const {setAuthUser} = authSlice.actions;
export default authSlice.reducer;