import { addCategory, getCategories, getItems, getItemById, getItemsDetails, addItem } from "@/redux/api/Menus/MenusApi"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getCategoriesThunk = createAsyncThunk('Menus/getCategories',
  async(page = 1, {rejectWithValue})=>{
    try{
      const response = await getCategories(page);
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getItemsThunk = createAsyncThunk('Menus/getItems',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getItems();
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const addCategoryThunk = createAsyncThunk('Menus/addCategory',
  async(formData , {rejectWithValue})=>{
    try{
      const response = await addCategory(formData);
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }  
  }
)

export const getItemByIdThunk = createAsyncThunk('Menus/getItemById',
  async(id , {rejectWithValue})=>{
    try{
      const response = await getItemById(id);
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }  
  }
)

export const getItemsDetailsThunk = createAsyncThunk('Menus/getItemsDetails',
  async(id , {rejectWithValue})=>{
    try{
      const response = await getItemsDetails(id);
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }  
  }
)

export const addItemThunk = createAsyncThunk('Menus/addItem',
  async(FormData , {rejectWithValue})=>{
    try{
      const response = await addItem(FormData);
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }  
  }
)

const initialState = {
  loading: false,
  error: null,
  getCategories: [],
  categoriesMeta: {
    current_page: 1,
    per_page: 10,
    total: 0,
    last_page: 1
  },
  getItems: [],
  getItemById : [],
  getItemsDetails:null,

}

const MenusSlice = createSlice({
  name:'Menus' , 
  initialState ,
  reducers:{

  },
  extraReducers:(builder)=>{
    builder
      //getCategoriesThunk
      .addCase(getCategoriesThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getCategoriesThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.getCategories = action.payload.data;      
        state.categoriesMeta = action.payload.meta;     
        state.error = null;
      })
      .addCase(getCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getItemsThunk
      .addCase(getItemsThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getItemsThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.getItems = action.payload; 
        state.error = null;
      })
      .addCase(getItemsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //addCategoryThunk
      .addCase(addCategoryThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(addCategoryThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(addCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getItemByIdThunk
      .addCase(getItemByIdThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getItemByIdThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.getItemById = action.payload; 
        state.error = null;
      })
      .addCase(getItemByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getItemsDetailsThunk
      .addCase(getItemsDetailsThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getItemsDetailsThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.getItemsDetails = action.payload; 
        state.error = null;
      })
      .addCase(getItemsDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //addItemThunk
      .addCase(addItemThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(addItemThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(addItemThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
  }
})

export const {} = MenusSlice.actions;

export default MenusSlice.reducer;