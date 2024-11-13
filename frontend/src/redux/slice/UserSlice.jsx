import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
   name:'auth',

    initialState : {
    user:{},
    token: null,
    isLoggedIn:false,
 },

   reducers:{     

     login(state, action){        
       state.token = action.payload.token;
       state.user = action.payload.user;
       state.isLoggedIn = true

     },
     updateUser(state, action){
       state.user = action.payload
     },
     logout(state){
      state.user={}
      state.token = null
      state.isLoggedIn=false
     }
      
   }

})


export const {login , updateUser,logout}= authSlice.actions

export default authSlice.reducer