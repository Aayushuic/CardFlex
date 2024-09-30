import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:null,
  loading:false
}

export const authslice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload
    },
    setLoading:(state,action)=>{
      state.loading = action.payload;
    },
    logout: (state)=>{
      state.user = null;
    },
    addToCart:(state,action)=>{
      state.user.cart = action.payload;
    },
    removeFromCart:(state,action)=>{
      state.user.cart = action.payload;
    },
    clearCart:(state,action)=>{
      state.user.cart = [];
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAuthUser,setLoading,logout,addToCart,removeFromCart,clearCart } = authslice.actions;

export default authslice.reducer;