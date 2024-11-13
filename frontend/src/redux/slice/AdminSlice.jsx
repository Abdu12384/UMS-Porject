import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: 'admin',
  initialState:{
    admin:{},
    AdminLoggedIn:false,
    token:null,
  },
  reducers:{
    adminLogin:(state,action) =>{
      state.token = action.payload.token
      state.admin = action.payload.admin
      state.AdminLoggedIn = true
    },
    adminLogout:(state)=>{
      state.admin={}
      state.token=null
      state.AdminLoggedIn=false
    }
  }
})

export const {adminLogin,adminLogout}=adminSlice.actions
export default adminSlice.reducer