import { changeStatus, getBookingNew, getBookingOngoing, getconversationsLatestUnseen, getcounters, getPropertiesAnalysis, getPropertiesTop, getProviderRate, getProviderState, gettopThreeBookings, getUpcoming, getWaitlist, setModuleId } from "@/redux/api/Home/HomeApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


//Home-Car-Street_module
//************************************************* */
export const setModuleIdThunk = createAsyncThunk('Home/setModuleIdThunk',
  async(module_id  , {rejectWithValue})=>{
    try{
      const response = await setModuleId(module_id )
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to add or update module ");
    }
  }
)

export const getProviderStateThunk = createAsyncThunk('Home/getProviderStateThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getProviderState()
      return response.data
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to fetch provider state");
    }
  }
)

export const getProviderRateThunk = createAsyncThunk('Home/getProviderRateThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getProviderRate()
      return response.data
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to fetch provider ratings");
    }
    }
)

export const getBookingNewThunk = createAsyncThunk('Home/getBookingNewThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getBookingNew()
      return response.data
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to fetch new bookings");
    }
  }
)

export const getBookingOngoingThunk = createAsyncThunk('Home/getBookingOngoingThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getBookingOngoing()
      return response.data
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to fetch ongoing bookings");
    }
  }
)

export const changeStatusThunk = createAsyncThunk('Home/changeStatusThunk',
  async(token , {rejectWithValue})=>{
    try{
      const response = await changeStatus(token)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to change status");
    }
  }
)
//property_module
//************************************************* */
export const getPropertiesAnalysisThunk = createAsyncThunk('Home/getPropertiesAnalysisThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getPropertiesAnalysis()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to fetch properties analysis");
    }
  }
)

export const getPropertiesTopThunk = createAsyncThunk('Home/getPropertiesTopThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getPropertiesTop()
      return response.data
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to fetch properties top");
    }
  }
)

export const gettopThreeBookingsThunk = createAsyncThunk('Home/gettopThreeBookingsThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await gettopThreeBookings()
      return response.data
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to fetch properties top three bookings");
    }
  }
)

export const getconversationsLatestUnseenThunk = createAsyncThunk('Home/getconversationsLatestUnseenThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getconversationsLatestUnseen()
      return response.data
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to fetch latest unseen conversations");
    }
  }
)

//Queue_module
//************************************************* */
export const getcountersThunk = createAsyncThunk('Home/getcountersThunk',
  async(_ , {rejectWithValue}) =>{
    try{
      const response = await getcounters()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getUpcomingThunk = createAsyncThunk('Home/getUpcomingThunk',
  async(_ , {rejectWithValue}) =>{
    try{
      const response = await getUpcoming()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getWaitlistThunk = createAsyncThunk('/Home/getWaitlistThunk',
  async(_ , {rejectWithValue}) =>{
    try{
      const response = await getWaitlist()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)




const initialState = {
  loading:false,
  error:null,
  moduleId:'',
  providerState:null,
  providerRate:[],
  newBookings:[],
  ongoingBookings:[],

  analysisProperties:null,
  topProperties:[],
  topThreeBookings:[],
  conversationsLatestUnseen:[],
  getcounters:null,
  getUpcoming:[],
  getWaitlist:[],






}

const homeSlice = createSlice({
  name:'Home' , 
  initialState ,
  reducers:{

  },
  extraReducers:(builder)=>{
    builder
      //setModuleIdThunk
      .addCase(setModuleIdThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(setModuleIdThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.moduleId = action.payload; 
        state.error = null;
      })
      .addCase(setModuleIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getProviderStateThunk
      .addCase(getProviderStateThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getProviderStateThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.providerState = action.payload; 
        state.error = null;
      })
      .addCase(getProviderStateThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getProviderRateThunk
      .addCase(getProviderRateThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getProviderRateThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.providerRate = action.payload; 
        state.error = null;
      })
      .addCase(getProviderRateThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getBookingNewThunk
      .addCase(getBookingNewThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getBookingNewThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.newBookings = action.payload; 
        state.error = null;
      })
      .addCase(getBookingNewThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getBookingOngoingThunk
      .addCase(getBookingOngoingThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getBookingOngoingThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.ongoingBookings = action.payload; 
        state.error = null;
      })
      .addCase(getBookingOngoingThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //changeStatusThunk
      .addCase(changeStatusThunk.pending , (state)=>{
        state.loading =true;
        state.error = null;
      })
      .addCase(changeStatusThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(changeStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //-------------------------------------------------------------------------------------
      //getPropertiesAnalysisThunk
      .addCase(getPropertiesAnalysisThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getPropertiesAnalysisThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.analysisProperties = action.payload; 
        state.error = null;
      })
      .addCase(getPropertiesAnalysisThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getPropertiesTopThunk
      .addCase(getPropertiesTopThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getPropertiesTopThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.topProperties = action.payload; 
        state.error = null;
      })
      .addCase(getPropertiesTopThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //gettopThreeBookingsThunk
      .addCase(gettopThreeBookingsThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(gettopThreeBookingsThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.topThreeBookings = action.payload; 
        state.error = null;
      })
      .addCase(gettopThreeBookingsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getconversationsLatestUnseenThunk
      .addCase(getconversationsLatestUnseenThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getconversationsLatestUnseenThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.conversationsLatestUnseen = action.payload; 
        state.error = null;
      })
      .addCase(getconversationsLatestUnseenThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getcountersThunk
      .addCase(getcountersThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getcountersThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.getcounters = action.payload; 
        state.error = null;
      })
      .addCase(getcountersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getUpcomingThunk
      .addCase(getUpcomingThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getUpcomingThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.getUpcoming = action.payload; 
        state.error = null;
      })
      .addCase(getUpcomingThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getWaitlistThunk
      .addCase(getWaitlistThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getWaitlistThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.getWaitlist = action.payload; 
        state.error = null;
      })
      .addCase(getWaitlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      
  }
})
export const {} = homeSlice.actions;

export default homeSlice.reducer;