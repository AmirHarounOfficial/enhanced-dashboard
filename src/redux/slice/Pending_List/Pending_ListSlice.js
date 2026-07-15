import { addWaitlist, arrivedWaitlist, delayWaitlist, getScanWaitlist, getWaitingList, getwaitlistAnalysis, scanWaitlist, seatedWaitlist } from "@/redux/api/Pending_List/Pending_ListApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getwaitlistAnalysisThunk = createAsyncThunk('PendingList/getwaitlistAnalysis',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getwaitlistAnalysis()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getWaitingListThunk = createAsyncThunk('PendingList/getWaitingList',
  async(params = {} , {rejectWithValue})=>{
    try{
      const response = await getWaitingList(params)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const addWaitlistThunk = createAsyncThunk('PendingList/addWaitlist',
  async(formData , {rejectWithValue})=>{
    try{
      const response = await addWaitlist(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const scanWaitlistThunk = createAsyncThunk('PendingList/scanWaitlist',
  async(formData , {rejectWithValue})=>{
    try{
      const response = await scanWaitlist(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const seatedWaitlistThunk = createAsyncThunk('PendingList/seatedWaitlist',
  async(formData , {rejectWithValue})=>{
    try{
      const response = await seatedWaitlist(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const arrivedWaitlistThunk = createAsyncThunk('PendingList/arrivedWaitlist',
  async(formData , {rejectWithValue})=>{
    try{
      const response = await arrivedWaitlist(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getScanWaitlistThunk = createAsyncThunk('PendingList/getScanWaitlist',
  async(formData , {rejectWithValue})=>{
    try{
      const response = await getScanWaitlist(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const delayWaitlistThunk = createAsyncThunk('PendingList/delayWaitlist',
  async(formData , {rejectWithValue})=>{
    try{
      const response = await delayWaitlist(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)





const initialState = {
  loading:false,
  error:null,
  getwaitlistAnalysis:null,
  getWaitingList:[],
  getScanWaitlist:null,



}


const Pending_ListSlice = createSlice({
  name:'PendingList' , 
  initialState ,
  reducers:{

  },
  extraReducers:(builder)=>{
    builder
      //getwaitlistAnalysisThunk
      .addCase(getwaitlistAnalysisThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getwaitlistAnalysisThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.getwaitlistAnalysis = action.payload; 
        state.error = null;
      })
      .addCase(getwaitlistAnalysisThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getWaitingListThunk
      .addCase(getWaitingListThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getWaitingListThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.getWaitingList = action.payload; 
        state.error = null;
      })
      .addCase(getWaitingListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //addWaitlistThunk
      .addCase(addWaitlistThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(addWaitlistThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(addWaitlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //scanWaitlistThunk
      .addCase(scanWaitlistThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(scanWaitlistThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(scanWaitlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //seatedWaitlistThunk
      .addCase(seatedWaitlistThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(seatedWaitlistThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(seatedWaitlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //arrivedWaitlistThunk
      .addCase(arrivedWaitlistThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(arrivedWaitlistThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(arrivedWaitlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getScanWaitlistThunk
      .addCase(getScanWaitlistThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getScanWaitlistThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.getScanWaitlist = action.payload; 
        state.error = null;
      })
      .addCase(getScanWaitlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //delayWaitlistThunk
      .addCase(delayWaitlistThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(delayWaitlistThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(delayWaitlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
  }
})
export const {} = Pending_ListSlice.actions;

export default Pending_ListSlice.reducer;