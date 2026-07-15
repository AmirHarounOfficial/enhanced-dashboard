import { assignHandyman, changeBookingAction, confirmReservation, getAllBookingProperty, getAvailableHandymen, getBookingByID, getBookingByIdProperty, getBookings, getDrowpdownFilters, getHalls, getPropertiesForFilter, getPropertyBookingById, getRejectionReasons, getReservations, getReservationsById, getViews, notifyUser, rejectReservation, UpdateBooking } from "@/redux/api/Requests/RequestsApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


//Home-Car-Street_module
//************************************************* */

export const getBookingsThunk = createAsyncThunk('Requests/getBookingsThunk',
  async(filters = {} , {rejectWithValue})=>{
    try{
      const response =await getBookings(filters)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to get bookings data");
    }
  }
)

export const getDrowpdownFiltersThunk = createAsyncThunk('Requests/getDrowpdownFiltersThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getDrowpdownFilters()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to get drowpdown filters data");
    }
  }
)

export const getBookingByIDThunk = createAsyncThunk('Requests/getBookingByIDThunk' ,
  async(id,{rejectWithValue})=>{
    try{
      const response= await getBookingByID(id)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to get data of booking by ID ");
    }
  }
)

export const getAvailableHandymenThunk = createAsyncThunk('Requests/getAvailableHandymenThunk' ,
  async(formData,{rejectWithValue})=>{
    try{
      const response= await getAvailableHandymen(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to get data of available handymen");
    }
  } 
)

export const assignHandymanThunk = createAsyncThunk('Requests/assignHandymanThunk' ,
  async(formData,{rejectWithValue})=>{
    try{
      const response= await assignHandyman(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to assign handyman");
    } 
  }
)

export const UpdateBookingThunk = createAsyncThunk('Requests/UpdateBookingThunk' ,
  async({id, formData},{rejectWithValue})=>{
    try{
      const response= await UpdateBooking(id, formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to update booking");
    } 
  }
)

export const getRejectionReasonsThunk = createAsyncThunk('Requests/getRejectionReasonsThunk' ,
  async(_,{rejectWithValue})=>{
    try{
      const response= await getRejectionReasons()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to get data of rejection reasons");
    }
  }
)

//property_module
//************************************************* */
export const getAllBookingPropertyThunk = createAsyncThunk('Requests/getAllBookingPropertyThunk',
  async(filters = {} , {rejectWithValue})=>{
    try{
      const response = await getAllBookingProperty(filters)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to get data of bookings");

    }
  }
)

export const getBookingByIdPropertyThunk = createAsyncThunk('Requests/getBookingByIdPropertyThunk',
  async(id , {rejectWithValue})=>{
    try{
      const response = await getBookingByIdProperty(id)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to get data of booking");
    }
  }
)

export const getPropertiesForFilterThunk = createAsyncThunk('Requests/getPropertiesForFilterThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getPropertiesForFilter()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to get properties for filter");

    }
  }
)

export const changeBookingActionThunk = createAsyncThunk('Requests/changeBookingActionThunk',
  async({ booking_id, action } , {rejectWithValue})=>{
    try{
      const response = await changeBookingAction({ booking_id, action })
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to change status");
    }
  }
)

export const getPropertyBookingByIdThunk = createAsyncThunk('Requests/getPropertyBookingThunk',
  async(id, {rejectWithValue})=>{
    try{
      const response = await getPropertyBookingById(id)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to get property booking ");
    }
  }
)

//Queue_module
/************************************************************ */

export const getReservationsThunk = createAsyncThunk('request/getReservationsThunk',
  async(params , {rejectWithValue})=>{
    try{
      const response = await getReservations(params)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const notifyUserThunk = createAsyncThunk('request/notifyUserThunk',
  async(formData , {rejectWithValue})=>{
    try{
      const response = await notifyUser(formData)
      return response 
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getHallsThunk = createAsyncThunk('request/getHallsThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getHalls()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getViewsThunk = createAsyncThunk('request/getViewsThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getViews()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getReservationsByIdThunk = createAsyncThunk('requests/getReservationsByIdThunk',
  async(id , {rejectWithValue})=>{
    try{
      const response = await getReservationsById(id)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const confirmReservationThunk = createAsyncThunk('requests/confirmReservationThunk',
  async(id , {rejectWithValue})=>{
    try{
      const response = await confirmReservation(id)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const rejectReservationThunk = createAsyncThunk('requests/rejectReservationThunk',
  async(id , {rejectWithValue})=>{
    try{
      const response = await rejectReservation(id)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)






const initialState = {
  loading: false,
  error: null,
  bookings:[],
  pagination: null,
  filterData:[],
  bookingDetails:null,
  availableHandymen: [],
  assignHandymanResponse: null,
  bookingDetails:null,
  RejectionReasons: [],


  getBooking:[],
  getBookingPagination: null,
  getBookingDetails:null,
  getPropertiesFilter:[],
  getPropertyBooking:null,

  getReservations:null,
  getHalls:[],
  getViews:[],
  getReservationsById:null,


}

const RequestsSlice = createSlice({
  name:'Requests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder 
      //getBookingsThunk
      .addCase(getBookingsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookingsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
        state.pagination = action.payload?.pagination || null;
      })
      .addCase(getBookingsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getDrowpdownFiltersThunk
      .addCase(getDrowpdownFiltersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDrowpdownFiltersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.filterData = action.payload;
      })
      .addCase(getDrowpdownFiltersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //getBookingByIDThunk
      .addCase(getBookingByIDThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookingByIDThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingDetails = action.payload.booking;
      })
      .addCase(getBookingByIDThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //getAvailableHandymenThunk
      .addCase(getAvailableHandymenThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAvailableHandymenThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.availableHandymen = action.payload.handymen || [];
      })
      .addCase(getAvailableHandymenThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //assignHandymanThunk
      .addCase(assignHandymanThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(assignHandymanThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.assignHandymanResponse = action.payload;
      })
      .addCase(assignHandymanThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //UpdateBookingThunk
      .addCase(UpdateBookingThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateBookingThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingDetails = action.payload;
      })
      .addCase(UpdateBookingThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getRejectionReasonsThunk
      .addCase(getRejectionReasonsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRejectionReasonsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.RejectionReasons = action.payload.data;
      })
      .addCase(getRejectionReasonsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })


      //getAllBookingPropertyThunk
      .addCase(getAllBookingPropertyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBookingPropertyThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.getBooking = action.payload;
        state.getBookingPagination = action.payload?.meta || null;
      })
      .addCase(getAllBookingPropertyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //getBookingByIdPropertyThunk
      .addCase(getBookingByIdPropertyThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookingByIdPropertyThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.getBookingDetails = action.payload;
      })
      .addCase(getBookingByIdPropertyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getPropertiesForFilterThunk
      .addCase(getPropertiesForFilterThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPropertiesForFilterThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.getPropertiesFilter = action.payload;
      })
      .addCase(getPropertiesForFilterThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //changeBookingActionThunk
      .addCase(changeBookingActionThunk.pending , (state)=>{
        state.loading =true;
        state.error = null;
      })
      .addCase(changeBookingActionThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(changeBookingActionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getPropertyBookingByIdThunk
      .addCase(getPropertyBookingByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPropertyBookingByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.getPropertyBooking = action.payload;
      })
      .addCase(getPropertyBookingByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getReservationsThunk
      .addCase(getReservationsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReservationsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.getReservations = action.payload;
      })
      .addCase(getReservationsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //notifyUserThunk
      .addCase(notifyUserThunk.pending , (state)=>{
        state.loading =true;
        state.error = null;
      })
      .addCase(notifyUserThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(notifyUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getHallsThunk
      .addCase(getHallsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHallsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.getHalls = action.payload;
      })
      .addCase(getHallsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //getViewsThunk
      .addCase(getViewsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getViewsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.getViews = action.payload;
      })
      .addCase(getViewsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //getReservationsByIdThunk
      .addCase(getReservationsByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReservationsByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.getReservationsById = action.payload;
      })
      .addCase(getReservationsByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //confirmReservationThunk
      .addCase(confirmReservationThunk.pending , (state)=>{
        state.loading =true;
        state.error = null;
      })
      .addCase(confirmReservationThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(confirmReservationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //rejectReservationThunk
      .addCase(rejectReservationThunk.pending , (state)=>{
        state.loading =true;
        state.error = null;
      })
      .addCase(rejectReservationThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(rejectReservationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
  }
})

export default RequestsSlice.reducer;