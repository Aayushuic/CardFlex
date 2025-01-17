import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentOrder:null,
  paymentStatus:null
}

export const paymentslice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload
    },
    setPaymentStatus:(state,action)=>{
      state.paymentStatus=action.payload
    },
    resetPayment:(state,action)=>{
      state.paymentStatus = null;
      state.currentOrder = null;
    } 
  },
})

// Action creators are generated for each case reducer function
export const {setCurrentOrder,setPaymentStatus,resetPayment} = paymentslice.actions;

export default paymentslice.reducer;