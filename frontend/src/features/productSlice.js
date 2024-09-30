import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  latestProducts:[],
  categoryProducts:null,
  searchedResult:null,
  searchKey:null,
  loading:false
}

export const productslice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setLatestProduct: (state, action) => {
      state.latestProducts = action.payload
    },
    setLoading:(state,action)=>{
      state.loading = action.payload;
    },
    setCategoryProducts:(state,action)=>{
      state.categoryProducts = action.payload;
    },
    sortProductsByPrice: (state, action) => {
      const { direction } = action.payload;
      if (direction === "asc") {
        state.categoryProducts.sort((a, b) => a.newPrice - b.newPrice);
      } else if (direction === "desc") {
        state.categoryProducts.sort((a, b) => b.newPrice - a.newPrice);
      }
    },
    setSearchedResult:(state,action)=>{
      state.searchedResult = action.payload;
    },
    setSearchKey:(state,action)=>{
      state.searchKey = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const {setLatestProduct,setLoading,setCategoryProducts,sortProductsByPrice,setSearchedResult,setSearchKey} = productslice.actions;

export default productslice.reducer;