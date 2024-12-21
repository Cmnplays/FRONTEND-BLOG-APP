import { createSlice } from "@reduxjs/toolkit";
const initialState={
    loading:false,
    userData:null,

}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true
            state.userData=action.payload.userData
        },
        logout:(state)=>{
            state.status=false
            state.userData=null
        },
        setUserLoading:(state,action)=>{
            state.loading=action.payload
        }
    }
})
export const {login,logout,setUserLoading} = authSlice.actions;
export default authSlice.reducer;