import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  user: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setUserDetails: (state,action)=>{

      //state of redux for admin page and header comp userdetails
        state.user = action.payload
        
        
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { setUserDetails } = userSlice.actions

export default userSlice.reducer