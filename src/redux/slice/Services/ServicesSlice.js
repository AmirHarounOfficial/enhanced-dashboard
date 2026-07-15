import { AddService, getAllAreas, getAllServices, getCategories, getmodules, getServiceAnalysisById, getServiceById, updateService, deleteService, getStreetServiceById, getFuelPrices, getActiveFuelTypes, deleteFuelPrice, updateServiceSetting, updateServiceSettingStatus, streetAssistantStatus, createFuelPrice, updateFuelPrice, getAllProperties, changeStatusById, deletePropertyItem, getPropertyTypes, getPropertiesCities, getAllDetails, getPropertyCalendar, getRoomTypes, getBedTypes, getRoomAmenty, getBathRoomTypes, getPropertiesAmenities, addBasicInfo, addLocation, addPropertyDetails, addAmenities, getPoliciesApproved, addPricingPolicies, getPricingPolicies, addAvailabilitySeasons, addMedia, addUnits, getAllDetailsById, addSubmitForReview, getBasicInfo, UpdateBasicInfo, getLocation, getUnits, getPropertyDetails, deleteRoom, deleteBathroom, getMedia, deleteVideo, getAvailabilitySeasons, deleteSeasonalPrice } from "@/redux/api/Services/ServicesApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Home-Car-****************************************************
//************************************************* */
//*********************************************************************** */

// get all services
export const getAllServicesThunk = createAsyncThunk(
  "services/getAll",
  async (params, { rejectWithValue }) => {
    try {
      const data = await getAllServices(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get specific service of (Details &Evaluation)
export const getServiceByIdThunk = createAsyncThunk(
  "services/getById",
  async (service_id, { rejectWithValue }) => {
    try {
      const data = await getServiceById(service_id);
      console.log("slice data", data);
      return data.service;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get specific service of (Analysis)
export const getServiceAnalysisByIdThunk = createAsyncThunk(
  "services/getAnalysisById",
  async (service_id, { rejectWithValue }) => {
    try {
      const data = await getServiceAnalysisById(service_id);
      console.log("analysis slice data", data);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

/**Add service list**/
//Get module
export const getmodulesThunk = createAsyncThunk(
  "services/getmodules",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getmodules();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get categories
export const getCategoriesThunk = createAsyncThunk(
  "services/getCategories",
  async (module_id, { rejectWithValue }) => {   
    try {
      const data = await getCategories(module_id);
      return data;
    }catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    } 
  }
);

//Get Areas
export const getAllAreasThunk = createAsyncThunk(
  'services/getAllAreasThunk',
    async(_,{rejectWithValue})=>{
      try{
        const response = await getAllAreas();
        return response
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      } 
    }
);

//Add service
export const AddServiceThunk = createAsyncThunk(
  'service/AddServiceThunk',
  async(formData,{rejectWithValue})=>{
    try{
      const response = await AddService(formData)
      console.log('AddServiceThunk' , response);
      return response.data
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const updateServiceThunk = createAsyncThunk(
  '/service/updateServiceThunk' , 
  async({ id, formData }, {rejectWithValue})=>{
    try{
      const response = await updateService(id, formData)
      console.log('updateServiceThunk' , response);
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const deleteServiceThunk = createAsyncThunk(
  "services/delete",
  async (service_id, { rejectWithValue }) => {
    try {
      const data = await deleteService(service_id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


//street assistant*******************************************************
/* ************************** *****************************************/
//**************************************************************************** */


export const getStreetServiceByIdThunk = createAsyncThunk(
  'sevices/getStreetServiceByIdThunk', 
    async(_,{rejectWithValue })=>{
      try{
        const response = await getStreetServiceById()
        console.log('getStreetServiceByIdThunk' , response);
        return response
      }catch(error){
        return rejectWithValue(error.response?.data || error.message);
      }
  }
)

export const getFuelPricesThunk = createAsyncThunk(
  'service/getFuelPricesThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getFuelPrices()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getActiveFuelTypesThunk = createAsyncThunk(
  'service/getActiveFuelTypesThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getActiveFuelTypes()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const deleteFuelPriceThunk = createAsyncThunk(
  'services/deleteFuelPriceThunk' , 
  async(id, {rejectWithValue})=>{
    try{
      const response = await deleteFuelPrice(id)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const updateServiceSettingThunk = createAsyncThunk(
  'services/updateServiceSettingThunk',
  async(formData, {rejectWithValue})=>{
    try{
      const response = await updateServiceSetting(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const updateServiceSettingStatusThunk = createAsyncThunk(
  'services/updateServiceSettingStatusThunk',
  async(formData, {rejectWithValue})=>{
    try{
      const response = await updateServiceSettingStatus(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const streetAssistantStatusThunk = createAsyncThunk(
  'services/streetAssistantStatusThunk',
  async(formData, {rejectWithValue})=>{
    try{
      const response = await streetAssistantStatus(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const createFuelPriceThunk = createAsyncThunk(
  'services/createFuelPriceThunk',
  async(formData, {rejectWithValue})=>{
    try{
      const response = await createFuelPrice(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const updateFuelPriceThunk = createAsyncThunk(
  'services/updateFuelPriceThunk',
  async(formData, {rejectWithValue})=>{
    try{
      const response = await updateFuelPrice(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)


//Property*******************************************************
/* ************************** *****************************************/
//**************************************************************************** */

export const getAllPropertiesThunk = createAsyncThunk('service/getAllPropertiesThunk', 
  async(params = {} , {rejectWithValue})=>{
    try{
      const response = await getAllProperties(params);
      return response; // returning whole response to get meta
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
})

export const changeStatusByIdThunk = createAsyncThunk(
  "service/changeStatusByIdThunk",
  async ({ property_id, status }, { rejectWithValue }) => {
    try {
      await changeStatusById(property_id, status);
      return { property_id, status };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deletePropertyThunk = createAsyncThunk(
  "service/deletePropertyThunk",
  async (id, { rejectWithValue }) => {
    try {
      await deletePropertyItem(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getPropertyTypesThunk = createAsyncThunk('services/getPropertyTypesThunk',
  async(_, {rejectWithValue}) =>{
    try{
      const response = await getPropertyTypes();
      return response;
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getPropertiesCitiesThunk = createAsyncThunk('services/getPropertiesCitiesThunk',
  async(_, {rejectWithValue}) =>{
    try{
      const response = await getPropertiesCities();
      return response;
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getAllDetailsThunk = createAsyncThunk('services/getAllDetailsThunk',
  async(id, {rejectWithValue}) =>{
    try{
      const response = await getAllDetails(id); 
      return response;
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getPropertyCalendarThunk = createAsyncThunk('services/getPropertyCalendarThunk',
  async({id, month}, {rejectWithValue}) =>{
    try{
      const response = await getPropertyCalendar(id, month); 
      return response;
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getRoomTypesThunk = createAsyncThunk('services/getRoomTypesThunk',
  async(_ , {rejectWithValue}) =>{
    try{
      const response = await getRoomTypes()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getBedTypesThunk = createAsyncThunk('services/getBedTypesThunk',
  async(_ , {rejectWithValue}) =>{
    try{
      const response = await getBedTypes()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getRoomAmentyThunk = createAsyncThunk('services/getRoomAmentyThunk',
  async(_ , {rejectWithValue}) =>{
    try{
      const response = await getRoomAmenty()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getBathRoomTypesThunk = createAsyncThunk('services/getBathRoomTypesThunk',
  async(_ , {rejectWithValue}) =>{
    try{
      const response = await getBathRoomTypes()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getPropertiesAmenitiesThunk = createAsyncThunk(
  'services/getPropertiesAmenitiesThunk',
  async (property_id, { rejectWithValue }) => {
    try {
      const response = await getPropertiesAmenities(property_id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addBasicInfoThunk = createAsyncThunk('services/addBasicInfoThunk',
  async(formData , {rejectWithValue})=>{
    try{
      const response = await addBasicInfo(formData)
      return response;
    }catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const addLocationThunk = createAsyncThunk('services/addLocationThunk',
  async(formData , {rejectWithValue})=>{
    try{
      const response = await addLocation(formData)
      return response;
    }catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const addPropertyDetailsThunk = createAsyncThunk('services/addPropertyDetailsThunk',
  async(formData , {rejectWithValue})=>{
    try{
      const response = await addPropertyDetails(formData)
      return response;
    }catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const addAmenitiesThunk = createAsyncThunk('services/addAmenitiesThunk', 
  async(formData , {rejectWithValue})=>{  
    try{
      const response = await addAmenities(formData) 
      return response;
    }catch (error) {  
      return rejectWithValue(error.response?.data || error.message);  
    }
  }
)

export const getPoliciesApprovedThunk = createAsyncThunk('services/getPoliciesApprovedThunk',
  async(property_id , {rejectWithValue})=>{
    try{
      const response = await getPoliciesApproved(property_id)
      return response.data;
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const addPricingPoliciesThunk = createAsyncThunk('services/addPricingPoliciesThunk',
  async({property_id, formData} , {rejectWithValue})=>{
    try{
      const response = await addPricingPolicies(property_id, formData)
      return response;
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getPricingPoliciesThunk = createAsyncThunk('services/getPricingPoliciesThunk',
  async(property_id, {rejectWithValue})=>{
    try{
      const response = await getPricingPolicies(property_id)
      return response.data;
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const addAvailabilitySeasonsThunk = createAsyncThunk('services/addAvailabilitySeasonsThunk',
  async({property_id, formData} , {rejectWithValue})=>{
    try{
      const response = await addAvailabilitySeasons(property_id, formData)
      return response;
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const addMediaThunk = createAsyncThunk(
  'services/addMediaThunk',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await addMedia(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addUnitsThunk = createAsyncThunk(
  'services/addUnitsThunk',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await addUnits(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllDetailsByIdThunk = createAsyncThunk('services/getAllDetailsByIdThunk',
  async(id, {rejectWithValue}) =>{
    try{
      const response = await getAllDetailsById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  } 
)

export const addSubmitForReviewThunk = createAsyncThunk('services/addSubmitForReviewThunk',
  async(property_id, {rejectWithValue})=>{
    try{
      const response = await addSubmitForReview(property_id)
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getBasicInfoThunk = createAsyncThunk('services/getBasicInfoThunk',
  async(property_id, {rejectWithValue})=>{
    try{
      const response = await getBasicInfo(property_id)
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const UpdateBasicInfoThunk = createAsyncThunk('service/UpdateBasicInfoThunk' ,
  async({property_id, formData} , {rejectWithValue})=>{
    try{
      const response = await UpdateBasicInfo(property_id, formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getLocationThunk = createAsyncThunk('services/getLocationThunk',
  async(id, {rejectWithValue})=>{
    try{
      const response = await getLocation(id)
      return response;
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getUnitsThunk = createAsyncThunk('services/getUnitsThunk',
  async(id, {rejectWithValue})=>{
    try{
      const response = await getUnits(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getPropertyDetailsThunk = createAsyncThunk('services/getPropertyDetailsThunk',
  async(id, {rejectWithValue})=>{
    try{
      const response = await getPropertyDetails(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getAmenitiesThunk = createAsyncThunk('services/getAmenitiesThunk',
  async(property_id, {rejectWithValue})=>{
    try{
      const response = await getAmenities(property_id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const deleteRoomThunk = createAsyncThunk('services/deleteRoomThunk',
  async(room_id, {rejectWithValue})=>{
    try{
      const response = await deleteRoom(room_id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const deleteBathroomThunk = createAsyncThunk('services/deleteBathroomThunk',
  async(bathroom_id, {rejectWithValue})=>{
    try{
      const response = await deleteBathroom(bathroom_id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getMediaThunk = createAsyncThunk('services/getMediaThunk',
  async(property_id, {rejectWithValue})=>{
    try{
      const response = await getMedia(property_id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const deleteVideoThunk = createAsyncThunk('services/deleteVideoThunk',
  async({ id, type }, {rejectWithValue})=>{
    try{
      const response = await deleteVideo(id, type);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getAvailabilitySeasonsThunk = createAsyncThunk('service/getAvailabilitySeasonsThunk',
  async(id , {rejectWithValue})=>{
    try{
      const response = await getAvailabilitySeasons(id)
      return response
    }catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const deleteSeasonalPriceThunk = createAsyncThunk('services/deleteSeasonalPriceThunk',
  async(id, {rejectWithValue})=>{
    try{
      const response = await deleteSeasonalPrice(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)









const initialState = {
    services: [],
    pagination: null,
    service: null,
    serviceAnalysis: null,
    getmodules: [],
    getCategories: null,
    getAreas : null,
    addService:null,

    loadingList: false, 
    loadingDetails: false,  
    errorList: null,
    errorDetails: null,

    /** */
    streetServices:[],
    selectedService:null,
    fuelPrice:[],
    ActiveFuel:[],
    serviceData:[],
    statusData:[],
    mainStatus:false,
    FuelPriceData:[],
    updateFuel:[],

    /** */
    getProperties:[],
    propertiesMeta: null,
    getPropertyTypes: [],
    getPropertiesCities: [],
    getDetails:null,
    getCalendar:[],
    getRoomTypes:[],
    getBedTypes:[],
    getRoomAmenty:[],
    getBathRoomTypes:[],
    getPropertiesAmenities:[],
    addBasicProperty:null,
    addLocation:null,
    addPropertyDetails:null,
    addAmenities:null,
    getPoliciesApproved:null,
    addPricingPolicies:null,
    getPricingPolicies:null,
    addAvailabilitySeasons:null,
    addMedia:null,
    addUnits:null,
    getAllDetailsById:null,
    addSubmitForReview:null,
    getBasicInfo:null,
    UpdateBasicInfo:null,
    getLocation:null,
    getUnits:null,
    getPropertyDetails:null,
    getAmenities:null,
    getMedia:null,
    getAvailabilitySeasons:null,
  };

const servicesSlice = createSlice({
  name: "services",
  initialState:initialState,
  reducers: {
    clearService: (state) => {
      state.service = null; // optional clear on dialog close
    },
    selectServiceById: (state, action) => {
      state.selectedService =
        state.streetServices.find(s => s.id === action.payload) || null
    },
  },
  extraReducers: (builder) => {
    builder
    //Home-Car-****************************************************
    /* ************************** */
      // ✅ All Services
      .addCase(getAllServicesThunk.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(getAllServicesThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        state.services = action.payload.services || action.payload;
        state.pagination = action.payload.pagination || null;
      })
      .addCase(getAllServicesThunk.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })

      // ✅ Single Service(Details &Evaluation)
      .addCase(getServiceByIdThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(getServiceByIdThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.service = action.payload;
      })
      .addCase(getServiceByIdThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })

      // ✅ Single Service(Analysis)
      .addCase(getServiceAnalysisByIdThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(getServiceAnalysisByIdThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.serviceAnalysis = action.payload;
      })
      .addCase(getServiceAnalysisByIdThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })

      // ✅ Get modules
      .addCase(getmodulesThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(getmodulesThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.getmodules = action.payload;
      })
      .addCase(getmodulesThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })

      // ✅ Get categories
      .addCase(getCategoriesThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(getCategoriesThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.getCategories = action.payload;
      }
      )
      .addCase(getCategoriesThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })

      // ✅ Get areas
      .addCase(getAllAreasThunk.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(getAllAreasThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        state.getAreas = action.payload
      })
      .addCase(getAllAreasThunk.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })

      // ✅ Add new service
      .addCase(AddServiceThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(AddServiceThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.addService = action.payload;
      })
      .addCase(AddServiceThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })

      // ✅ Update service
      .addCase(updateServiceThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(updateServiceThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.service = action.payload; 
      })
      .addCase(updateServiceThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })

      // ✅ Delete service
      .addCase(deleteServiceThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(deleteServiceThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        // Optimization: remove from list immediately
        if (state.services) {
          state.services = state.services.filter(s => s.id !== action.meta.arg);
        }
      })
      .addCase(deleteServiceThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })

//street assistant-****************************************************
/* ************************** */
      //getStreetServiceByIdThunk
      .addCase(getStreetServiceByIdThunk.pending, (state) => {
        state.loadingList = true
      })
      .addCase(getStreetServiceByIdThunk.fulfilled, (state, action) => {
        state.loadingList = false
        state.streetServices = action.payload.services
        state.mainStatus = action.payload.street_status
        state.selectedService = action.payload.services[0] || null
      })
      .addCase(getStreetServiceByIdThunk.rejected, (state, action) => {
        state.loadingList = false
        state.errorList = action.payload
      })

      // getFuelPricesThunk
      .addCase(getFuelPricesThunk.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(getFuelPricesThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        state.fuelPrice = action.payload;
      })
      .addCase(getFuelPricesThunk.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })

      //getActiveFuelTypesThunk
      .addCase(getActiveFuelTypesThunk.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(getActiveFuelTypesThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        state.ActiveFuel = action.payload;
      })
      .addCase(getActiveFuelTypesThunk.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })

      // deleteFuelPriceThunk
      .addCase(deleteFuelPriceThunk.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(deleteFuelPriceThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        // Assuming action.meta.arg is the id passed to the thunk
        if (Array.isArray(state.fuelPrice)) {
          state.fuelPrice = state.fuelPrice.filter(item => item.id !== action.meta.arg);
        } else {
          state.fuelPrice = []; // fallback
        }
      })
      .addCase(deleteFuelPriceThunk.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })

      // updateServiceSettingThunk
      .addCase(updateServiceSettingThunk.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(updateServiceSettingThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        state.serviceData = action.payload;

      })
      .addCase(updateServiceSettingThunk.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })

      //updateServiceSettingStatusThunk
      .addCase(updateServiceSettingStatusThunk.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(updateServiceSettingStatusThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        state.statusData = action.payload;

      })
      .addCase(updateServiceSettingStatusThunk.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })
      //streetAssistantStatusThunk
      .addCase(streetAssistantStatusThunk.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(streetAssistantStatusThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        if (action.payload.status !== undefined) {
        state.mainStatus = action.payload.status;
        }
      })
      .addCase(streetAssistantStatusThunk.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })
      //createFuelPriceThunk
      .addCase(createFuelPriceThunk.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(createFuelPriceThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        state.FuelPriceData = action.payload;

      })
      .addCase(createFuelPriceThunk.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })

      //updateFuelPriceThunk
      .addCase(updateFuelPriceThunk.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(updateFuelPriceThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        state.updateFuel = action.payload;

      })
      .addCase(updateFuelPriceThunk.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })
      
      //Property -****************************************************
      /* ************************** */

      //getAllPropertiesThunk
      .addCase(getAllPropertiesThunk.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(getAllPropertiesThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        state.getProperties = action.payload?.data || action.payload || [];
        state.propertiesMeta = action.payload?.meta || null;
      })
      .addCase(getAllPropertiesThunk.rejected, (state, action) => {
        state.loadingList = false;  
        state.errorList = action.payload; 
      })
      //changeStatusByIdThunk
      .addCase(changeStatusByIdThunk.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(changeStatusByIdThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        const { property_id, status } = action.payload;
        const property = state.getProperties.find(
          (p) => p.id === property_id
        );
        if (property) {
          property.activity_status = status;
        }
      })
      .addCase(changeStatusByIdThunk.rejected, (state, action) => {
        state.loadingList = false;  
        state.errorList = action.payload; 
      })
      
      //deletePropertyThunk
      .addCase(deletePropertyThunk.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(deletePropertyThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        if (state.getProperties) {
          state.getProperties = state.getProperties.filter((p) => p.id !== action.payload);
        }
      })
      .addCase(deletePropertyThunk.rejected, (state, action) => {
        state.loadingList = false;  
        state.errorList = action.payload; 
      })
      //getPropertyTypesThunk
      .addCase(getPropertyTypesThunk.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(getPropertyTypesThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        state.getPropertyTypes = action.payload || [];
      })
      .addCase(getPropertyTypesThunk.rejected, (state, action) => {
        state.loadingList = false;  
        state.errorList = action.payload; 
      })
      //getPropertiesCitiesThunk
      .addCase(getPropertiesCitiesThunk.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(getPropertiesCitiesThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        state.getPropertiesCities = action.payload || [];
      })
      .addCase(getPropertiesCitiesThunk.rejected, (state, action) => {
        state.loadingList = false;  
        state.errorList = action.payload; 
      })
      //getAllDetailsThunk
      .addCase(getAllDetailsThunk.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(getAllDetailsThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        state.getDetails = action.payload ;
      })
      .addCase(getAllDetailsThunk.rejected, (state, action) => {
        state.loadingList = false;  
        state.errorList = action.payload; 
      })
      //getPropertyCalendarThunk
      .addCase(getPropertyCalendarThunk.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(getPropertyCalendarThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        state.getCalendar = action.payload ;
      })
      .addCase(getPropertyCalendarThunk.rejected, (state, action) => {
        state.loadingList = false;  
        state.errorList = action.payload; 
      })
      //getRoomTypesThunk
      .addCase(getRoomTypesThunk.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(getRoomTypesThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        state.getRoomTypes = action.payload || [];
      })
      .addCase(getRoomTypesThunk.rejected, (state, action) => {
        state.loadingList = false;  
        state.errorList = action.payload; 
      })
      //getBedTypesThunk
      .addCase(getBedTypesThunk.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(getBedTypesThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        state.getBedTypes = action.payload || [];
      })
      .addCase(getBedTypesThunk.rejected, (state, action) => {
        state.loadingList = false;  
        state.errorList = action.payload; 
      })
      
      //getRoomAmentyThunk
      .addCase(getRoomAmentyThunk.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(getRoomAmentyThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        state.getRoomAmenty = action.payload || [];
      })
      .addCase(getRoomAmentyThunk.rejected, (state, action) => {
        state.loadingList = false;  
        state.errorList = action.payload; 
      })
      //getBathRoomTypesThunk
      .addCase(getBathRoomTypesThunk.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(getBathRoomTypesThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        state.getBathRoomTypes = action.payload || [];
      })
      .addCase(getBathRoomTypesThunk.rejected, (state, action) => {
        state.loadingList = false;  
        state.errorList = action.payload; 
      })
      //getPropertiesAmenitiesThunk
      .addCase(getPropertiesAmenitiesThunk.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(getPropertiesAmenitiesThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        state.getPropertiesAmenities = action.payload;
      })
      .addCase(getPropertiesAmenitiesThunk.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })
      //addBasicInfoThunk
      .addCase(addBasicInfoThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(addBasicInfoThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.addBasicProperty = action.payload;
      })
      .addCase(addBasicInfoThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })
      //addLocationThunk
      .addCase(addLocationThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(addLocationThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.addLocation = action.payload;
      })
      .addCase(addLocationThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })
      //addPropertyDetailsThunk
      .addCase(addPropertyDetailsThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(addPropertyDetailsThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.addPropertyDetails = action.payload;
      })
      .addCase(addPropertyDetailsThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })
      //addAmenitiesThunk
      .addCase(addAmenitiesThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(addAmenitiesThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.addAmenities = action.payload;
      })
      .addCase(addAmenitiesThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })
        //getPoliciesApprovedThunk
      .addCase(getPoliciesApprovedThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(getPoliciesApprovedThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.getPoliciesApproved = action.payload;
      })
      .addCase(getPoliciesApprovedThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })
      //addPricingPoliciesThunk
      .addCase(addPricingPoliciesThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(addPricingPoliciesThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.addPricingPolicies = action.payload;
      })
      .addCase(addPricingPoliciesThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })
      //getPricingPoliciesThunk
      .addCase(getPricingPoliciesThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(getPricingPoliciesThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.getPricingPolicies = action.payload;
      })
      .addCase(getPricingPoliciesThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })
      //addAvailabilitySeasonsThunk
      .addCase(addAvailabilitySeasonsThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(addAvailabilitySeasonsThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.addAvailabilitySeasons = action.payload;
      })
      .addCase(addAvailabilitySeasonsThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })
      //addMediaThunk
      .addCase(addMediaThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(addMediaThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.addMedia = action.payload;
      })
      .addCase(addMediaThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })
      //addUnitsThunk
      .addCase(addUnitsThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(addUnitsThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.addUnits = action.payload;
      })
      .addCase(addUnitsThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })
      //getAllDetailsByIdThunk
      .addCase(getAllDetailsByIdThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(getAllDetailsByIdThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.getAllDetailsById = action.payload;
      })
      .addCase(getAllDetailsByIdThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })
      //addSubmitForReviewThunk
      .addCase(addSubmitForReviewThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(addSubmitForReviewThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.addSubmitForReview = action.payload;
      })
      .addCase(addSubmitForReviewThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })
      //getBasicInfoThunk
      .addCase(getBasicInfoThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(getBasicInfoThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.getBasicInfo = action.payload;
      })
      .addCase(getBasicInfoThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })
      //UpdateBasicInfoThunk
      .addCase(UpdateBasicInfoThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(UpdateBasicInfoThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.UpdateBasicInfo = action.payload;
      })
      .addCase(UpdateBasicInfoThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })
      //getLocationThunk
      .addCase(getLocationThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(getLocationThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.getLocation = action.payload;
      })
      .addCase(getLocationThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })
      //getUnitsThunk
      .addCase(getUnitsThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(getUnitsThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.getUnits = action.payload;
      })
      .addCase(getUnitsThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })
      //getPropertyDetailsThunk
      .addCase(getPropertyDetailsThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(getPropertyDetailsThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.getPropertyDetails = action.payload;
      })
      .addCase(getPropertyDetailsThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })
      //getAmenitiesThunk
      .addCase(getAmenitiesThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(getAmenitiesThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.getAmenities = action.payload;
      })
      .addCase(getAmenitiesThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })
      //deleteRoomThunk
      .addCase(deleteRoomThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(deleteRoomThunk.fulfilled, (state) => {
        state.loadingDetails = false;
      })
      .addCase(deleteRoomThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })

      //deleteBathroomThunk
      .addCase(deleteBathroomThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(deleteBathroomThunk.fulfilled, (state) => {
        state.loadingDetails = false;
      })
      .addCase(deleteBathroomThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })
      //getMediaThunk
      .addCase(getMediaThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(getMediaThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.getMedia = action.payload;
      })
      .addCase(getMediaThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })

      //deleteVideoThunk
      .addCase(deleteVideoThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(deleteVideoThunk.fulfilled, (state) => {
        state.loadingDetails = false;
      })
      .addCase(deleteVideoThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })

      //getAvailabilitySeasonsThunk
      .addCase(getAvailabilitySeasonsThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(getAvailabilitySeasonsThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.getAvailabilitySeasons = action.payload;
      })
      .addCase(getAvailabilitySeasonsThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })

      //deleteSeasonalPriceThunk
      .addCase(deleteSeasonalPriceThunk.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(deleteSeasonalPriceThunk.fulfilled, (state) => {
        state.loadingDetails = false;
      })
      .addCase(deleteSeasonalPriceThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      })

  },
});

export const { clearService } = servicesSlice.actions;
export default servicesSlice.reducer;
