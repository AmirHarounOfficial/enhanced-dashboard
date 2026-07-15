import { AddIpn, CardMarketer, changeEmail, changePhone, deleteWithdrawsMarketer, deletePolicy, getPolicies, getProfile, setNewPassword, updateProfileImage, verifyEmailOtp, verifyPhoneOtp, withdrawsMarketer, createPolicies, editPolicies, getReview, getWorkplaces, deleteArea, addArea, getSchedule, updateSchedule, getRequiredDocuments, uploadDocument, BookingSetting, getBookingSetting, getCalendarSetting, CalendarSetting, getRuleSetting, RuleSetting, getAdvancedSetting, AdvancedSetting } from "@/redux/api/Setting/SettingApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const changeEmailThunk = createAsyncThunk('setting/changeEmail' , 
  async(email , {rejectWithValue})=>{
    try{
      const response = await changeEmail(email)
      // console.log('changeEmailThunk' ,response );
      return response 
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to change email");
    }
  }
)

export const verifyEmailOtpThunk = createAsyncThunk('setting/verifyEmailOtp' , 
  async(otp , {rejectWithValue})=>{
    try{
      const response = await verifyEmailOtp(otp)
      // console.log('verifyEmailOtpThunk' ,response );
      return response 
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to verify OTP");
    }
  }
)

export const getProfileThunk = createAsyncThunk('setting/getProfileThunk' , 
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getProfile()
      // console.log('getProfileThunk' , response);
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to get profile ");
    }
  }
)

export const changePhoneThunk = createAsyncThunk('setting/changePhoneThunk' , 
  async(formData , {rejectWithValue})=>{
    try{
      const response = await changePhone(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to change phone");
    }
  }
)

export const verifyPhoneOtpThunk = createAsyncThunk('setting/verifyPhoneOtp' , 
  async(otp , {rejectWithValue})=>{
    try{
      const response = await verifyPhoneOtp(otp)
      // console.log('verifyPhoneOtpThunk' ,response );
      return response 
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to verify OTP");
    }
  }
)

export const CardMarketerThunk = createAsyncThunk('setting/CardMarketerThunk' ,
  async(_ , {rejectWithValue})=>{
    try{
      const response = await CardMarketer()
      console.log('CardMarketerThunk' ,response );
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to get data of card");
    }
    
  }
)


export const withdrawsMarketerThunk = createAsyncThunk('setting/withdrawsMarketerThunk' ,
  async(params , {rejectWithValue})=>{
    try{
      const response = await withdrawsMarketer(params)
      console.log('withdrawsMarketerThunk' ,response );
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to get data of withdraws");
    }
    
  }
)

export const deleteWithdrawsMarketerThunk = createAsyncThunk('setting/deleteWithdrawsMarketerThunk',
  async(marketerId , {rejectWithValue})=>{
    try{
      await deleteWithdrawsMarketer(marketerId)
      return marketerId
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to delete withdraws marketer");
    }
  }
)

export const AddIpnThunk = createAsyncThunk('setting/AddIpnThunk',
  async(formData , {rejectWithValue})=>{
    try{
      const response = await AddIpn(formData)
      // console.log('AddIpnThunk' , response);
      return response.data
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to post data of IPN");
    }
  }
)

export const setNewPasswordThunk = createAsyncThunk('setting/setNewPasswordThunk' ,
  async(formData , {rejectWithValue})=>{
    try{
      const response = await setNewPassword(formData)
      // console.log('setNewPasswordThunk', response.data);
      return response.data
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to post new password");
    }
  }
)

export const updateProfileImageThunk = createAsyncThunk('setting/updateProfileImageThunk' ,
  async(formData ,{rejectWithValue})=>{
    try{
      const response = await updateProfileImage(formData)
      return response.data
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to post profile image");
    }
  }
)

/***************************************************** */
//******Activity_Settings

/* Home-Car-Street_module */
export const getPoliciesThunk = createAsyncThunk('setting/getPoliciesThunk' , 
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getPolicies()
      return response.data
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to get policies  image");
    }
  }
)

export const deletePolicyThunk = createAsyncThunk('setting/deletePolicyThunk',
  async(policyId , {rejectWithValue})=>{
    try{
      await deletePolicy(policyId)
      return policyId
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to delete policy");
    }
  }
)

export const createPoliciesThunk = createAsyncThunk('setting/createPoliciesThunk',
  async(formData , {rejectWithValue})=>{
    try{
      const response = await createPolicies(formData)
      return response.data
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to create policy");
    }
  }
)

export const editPoliciesThunk = createAsyncThunk('setting/editPoliciesThunk',
  async(formData , {rejectWithValue})=>{
    try{
      const response = await editPolicies(formData)
      return response.data
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to edit policy");
    }
  }
)

export const getReviewThunk = createAsyncThunk('setting/getReviewThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getReview();
      console.log("getReviewThunk" , response);
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to get Review");
    }
  }
)

export const getWorkplacesThunk = createAsyncThunk('setting/getWorkplacesThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getWorkplaces()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to get Workplaces");
    }
  }
)

export const deleteAreaThunk = createAsyncThunk('setting/deleteAreaThunk',
  async(areaId , {rejectWithValue})=>{
    try{
      await deleteArea(areaId)
      return areaId
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to delete area");
    }
  }
)

export const addAreaThunk = createAsyncThunk('setting/addAreaThunk',
  async(formData , {rejectWithValue})=>{
    try{
      const response = await addArea(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to add area");
    }
  }
)

export const getScheduleThunk = createAsyncThunk('setting/getScheduleThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getSchedule()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to get schedule");
    }
  }
)

export const updateScheduleThunk = createAsyncThunk('setting/updateScheduleThunk' ,
  async(formData , {rejectWithValue})=>{
    try{
      const response = await updateSchedule(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to update schedule");
    }
  }
)

export const getRequiredDocumentsThunk = createAsyncThunk('setting/getRequiredDocumentsThunk' ,
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getRequiredDocuments()
      return response.data
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to get required documents");
    }
  }
)

export const uploadDocumentThunk = createAsyncThunk('setting/uploadDocumentThunk' , 
  async(formData ,{rejectWithValue})=>{
    try{
      const response = await uploadDocument(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to upload document");
    }
  }
)



/* property_module */

export const getBookingSettingThunk = createAsyncThunk('setting/getBookingSettingThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getBookingSetting()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const BookingSettingThunk = createAsyncThunk('setting/BookingSettingThunk',
  async(formData , {rejectWithValue})=>{
    try{
      const response = await BookingSetting(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getCalendarSettingThunk = createAsyncThunk('setting/getCalendarSettingThunk',
  async(_ ,{rejectWithValue})=>{
    try{
      const response = await getCalendarSetting()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const CalendarSettingThunk = createAsyncThunk('setting/CalendarSettingThunk',
  async(formData , {rejectWithValue})=>{
    try{
      const response = await CalendarSetting(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getRuleSettingThunk = createAsyncThunk('setting/getRuleSettingThunk' , 
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getRuleSetting()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const RuleSettingThunk = createAsyncThunk('settting/RuleSettingThunk' , 
  async(formData , {rejectWithValue})=>{
    try{
      const response = await RuleSetting(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getAdvancedSettingThunk = createAsyncThunk('setting/getAdvancedSettingThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getAdvancedSetting()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const AdvancedSettingThunk = createAsyncThunk('setting/AdvancedSettingThunk' , 
  async(formData , {rejectWithValue})=>{
    try{
        const response = await AdvancedSetting(formData)
        return response
      }catch(error){
        return rejectWithValue(error.response?.data || error.message);
      }
  }
)


const initialState ={
  success:false,
  loading: false,
  error: null,

  successEmail:false,
  otpVerified: false,
  otpLoading: false,
  otpError: null,

  profileData:null,

  successPhone:false,
  otpPhoneVerified: false,
  otpPhoneLoading: false,
  otpPhoneError: null,

  cardData:[],
  withdrawsData:[],
  last_page: 1,

  ipnData: null,
  
  policies:[],
  addpolicies:null,
  editpolicies:null,

  reviews:[],
  Workplaces:[],
  areas:null,
  schedule:null,

  documents:[],
  documents:null,

  getBookingSetting:null,
  BookingSetting:null,
  getCalendarSetting:null,
  CalendarSetting:null,
  getRuleSetting:null,
  RuleSetting:null,
  getAdvancedSetting:null,
  AdvancedSetting:null,




}



const settingSlice = createSlice({
  name:'setting' ,
  initialState,
  reducers: {
    resetEmailState: (state) => {
      state.successEmail = false;
      state.loading = false;
      state.error = null;
      state.otpVerified = false;
      state.otpLoading = false;
      state.otpError = null;
    },
    resetPhoneState: (state) => {
      state.successPhone = false;
      state.loading = false;
      state.error = null;
      state.otpPhoneVerified = false;
      state.otpPhoneLoading = false;
      state.otpPhoneError = null;
    },
    resetChangePasswordState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers:(builder)=>{
    builder
      //changeEmail
      .addCase(changeEmailThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeEmailThunk.fulfilled, (state) => {
        state.loading = false;
        state.successEmail = true;
      })
      .addCase(changeEmailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //verifyEmailOtp
      .addCase(verifyEmailOtpThunk.pending, (state) => {
        state.otpLoading = true;
        state.otpError = null;
      })
      .addCase(verifyEmailOtpThunk.fulfilled, (state) => {
        state.otpLoading = false;
        state.otpVerified = true;
      })
      .addCase(verifyEmailOtpThunk.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpError = action.payload;
      })
      //getProfile
      .addCase(getProfileThunk.pending , (state)=>{
        state.loading = true ;
        state.error = null;
      })
      .addCase(getProfileThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.profileData = action.payload;
      })
      .addCase(getProfileThunk.rejected , (state , action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      //changePhone
      .addCase(changePhoneThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePhoneThunk.fulfilled, (state) => {
        state.loading = false;
        state.successPhone = true;
      })
      .addCase(changePhoneThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //verifyPhoneOtp
      .addCase(verifyPhoneOtpThunk.pending, (state) => {
        state.otpPhoneLoading = true;
        state.otpPhoneError = null;
      })
      .addCase(verifyPhoneOtpThunk.fulfilled, (state) => {
        state.otpPhoneLoading = false;
        state.otpPhoneVerified = true;
      })
      .addCase(verifyPhoneOtpThunk.rejected, (state, action) => {
        state.otpPhoneLoading = false;
        state.otpPhoneError = action.payload;
      })
      //CardMarketer
      .addCase(CardMarketerThunk.pending , (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(CardMarketerThunk.fulfilled,(state , action)=>{
        state.loading = false;
        state.cardData = action.payload;
      })
      .addCase(CardMarketerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //withdrawsMarketer
      .addCase(withdrawsMarketerThunk.pending , (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(withdrawsMarketerThunk.fulfilled,(state , action)=>{
        state.loading = false;
        state.withdrawsData = action.payload.data;
        state.last_page = action.payload.pagination?.last_page || 1;
      })
      .addCase(withdrawsMarketerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //deleteWithdraws
      .addCase(deleteWithdrawsMarketerThunk.pending , (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWithdrawsMarketerThunk.fulfilled , (state,action)=>{
        state.loading = false;
        state.withdrawsData = state.withdrawsData.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteWithdrawsMarketerThunk.rejected , (state , action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      //AddIpn
      .addCase(AddIpnThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddIpnThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ipnData = action.payload;
      })
      .addCase(AddIpnThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //setNewPasswordThunk
      .addCase(setNewPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(setNewPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = false;
      })
      .addCase(setNewPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      //updateProfileImageThunk
      .addCase(updateProfileImageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfileImageThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = false;
      })
      .addCase(updateProfileImageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
/***************************************************************** */
      //getPoliciesThunk
      .addCase(getPoliciesThunk.pending , (state)=>{
        state.loading = true ;
        state.error = null;
      })
      .addCase(getPoliciesThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.policies = action.payload;
      })
      .addCase(getPoliciesThunk.rejected , (state , action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      //deletePolicyThunk
      .addCase(deletePolicyThunk.pending , (state)=>{
        state.loading = true ;
        state.error = null;
      })
      .addCase(deletePolicyThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.policies = state.policies.filter(
          (policy) => policy.id !== action.payload
        );
      })
      .addCase(deletePolicyThunk.rejected , (state , action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      //createPoliciesThunk
      .addCase(createPoliciesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPoliciesThunk.fulfilled, (state ,action ) => {
        state.loading = false;
        state.addpolicies = action.payload;
      })
      .addCase(createPoliciesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //editPoliciesThunk
      .addCase(editPoliciesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPoliciesThunk.fulfilled, (state ,action ) => {
        state.loading = false;
        state.editpolicies = action.payload;
      })
      .addCase(editPoliciesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //getReviewThunk
      .addCase(getReviewThunk.pending , (state)=>{
        state.loading = true ;
        state.error = null;
      })
      .addCase(getReviewThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getReviewThunk.rejected , (state , action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      //getWorkplacesThunk
      .addCase(getWorkplacesThunk.pending , (state)=>{
        state.loading = true ;
        state.error = null;
      })
      .addCase(getWorkplacesThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.Workplaces = action.payload;
      })
      .addCase(getWorkplacesThunk.rejected , (state , action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      //deleteAreaThunk
      .addCase(deleteAreaThunk.pending , (state)=>{
        state.loading = true ;
        state.error = null;
      })
      .addCase(deleteAreaThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.Workplaces = {
          ...state.Workplaces,
          areas: state.Workplaces?.areas?.filter(
            (area) => area.id !== action.payload
          )
        };
      })
      .addCase(deleteAreaThunk.rejected , (state , action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      //addAreaThunk
      .addCase(addAreaThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAreaThunk.fulfilled, (state ,action ) => {
        state.loading = false;
        state.areas = action.payload;
      })
      .addCase(addAreaThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //getScheduleThunk
      .addCase(getScheduleThunk.pending , (state)=>{
        state.loading = true ;
        state.error = null;
      })
      .addCase(getScheduleThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.schedule = action.payload;
      })
      .addCase(getScheduleThunk.rejected , (state , action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      //updateScheduleThunk
      .addCase(updateScheduleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateScheduleThunk.fulfilled, (state ,action ) => {
        state.loading = false;
        state.schedule = action.payload;
      })
      .addCase(updateScheduleThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //getRequiredDocumentsThunk
      .addCase(getRequiredDocumentsThunk.pending , (state)=>{
        state.loading = true ;
        state.error = null;
      })
      .addCase(getRequiredDocumentsThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.documents = action.payload;
      })
      .addCase(getRequiredDocumentsThunk.rejected , (state , action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      //uploadDocumentThunk
      .addCase(uploadDocumentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadDocumentThunk.fulfilled, (state ,action ) => {
        state.loading = false;
        state.document = action.payload;
      })
      .addCase(uploadDocumentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getBookingSettingThunk
      .addCase(getBookingSettingThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookingSettingThunk.fulfilled, (state ,action ) => {
        state.loading = false;
        state.getBookingSetting = action.payload;
      })
      .addCase(getBookingSettingThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //BookingSettingThunk
      .addCase(BookingSettingThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(BookingSettingThunk.fulfilled, (state ,action ) => {
        state.loading = false;
        state.BookingSetting = action.payload;
      })
      .addCase(BookingSettingThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //getCalendarSettingThunk
      .addCase(getCalendarSettingThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCalendarSettingThunk.fulfilled, (state ,action ) => {
        state.loading = false;
        state.getCalendarSetting = action.payload;
      })
      .addCase(getCalendarSettingThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //CalendarSettingThunk
      .addCase(CalendarSettingThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CalendarSettingThunk.fulfilled, (state ,action ) => {
        state.loading = false;
        state.CalendarSetting = action.payload;
      })
      .addCase(CalendarSettingThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //getRuleSettingThunk
      .addCase(getRuleSettingThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRuleSettingThunk.fulfilled, (state ,action ) => {
        state.loading = false;
        state.getRuleSetting = action.payload;
      })
      .addCase(getRuleSettingThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //RuleSettingThunk
      .addCase(RuleSettingThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RuleSettingThunk.fulfilled, (state ,action ) => {
        state.loading = false;
        state.RuleSetting = action.payload;
      })
      .addCase(RuleSettingThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //getAdvancedSettingThunk
      .addCase(getAdvancedSettingThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdvancedSettingThunk.fulfilled, (state ,action ) => {
        state.loading = false;
        state.getAdvancedSetting = action.payload;
      })
      .addCase(getAdvancedSettingThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //AdvancedSettingThunk
      .addCase(AdvancedSettingThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AdvancedSettingThunk.fulfilled, (state ,action ) => {
        state.loading = false;
        state.AdvancedSetting = action.payload;
      })
      .addCase(AdvancedSettingThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

}
})

export const { resetEmailState ,resetPhoneState , resetChangePasswordState} = settingSlice.actions;
export default settingSlice.reducer;