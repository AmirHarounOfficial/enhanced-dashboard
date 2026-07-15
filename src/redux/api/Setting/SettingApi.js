import API from "../../../../config/api"

export const changeEmail = async({email})=>{
  const response = await API.post('/provider/changeEmailRequest' , {email})
  // console.log('API response:', response.data);
  return response.data
}

export const verifyEmailOtp = async({otp})=>{
  const response = await API.post('/provider/changeEmailOtp' , {otp})
  // console.log('Verify OTP response:', response.data);
  return response.data
}


// profile endpoint to update localstorage data of user******/////
export const getProfile = async()=>{
  const response = await API.get('/provider/me')
  return response.data
}

export const changePhone = async({phone , country_code})=>{
  const response = await API.post('/provider/changePhoneRequest' , {phone , country_code})
  return response.data
}

export const verifyPhoneOtp = async({otp})=>{
  const response = await API.post('/provider/changePhoneOtp' , {otp})
  // console.log('Verify OTP response:', response.data);
  return response.data
}

export const CardMarketer = async()=>{
  const response =  await API.get('/marketer/analysis')
  return response.data
}

export const withdrawsMarketer = async (params) => {
  const response = await API.get("/marketer/withdraws", { params });
  return response.data;
};


export const deleteWithdrawsMarketer = async(marketerId)=>{
  const response = await API.post('/marketer/cancel/Withdraw' , {id:marketerId})
  return response.data
}

export const AddIpn = async(formData)=>{
  const response = await API.post('/marketer/add-ipn' , formData , {
    headers: {
      'Content-Type': 'multipart/form-data',
    }})
    return response
}

export const setNewPassword = async(formData)=>{
  const response = await API.post('/provider/change-password',{ ...formData}, {
    headers: {
      'Content-Type': 'application/json',
    }})
  return response 
}

export const updateProfileImage = async (formData) => {
  const response = await API.post("/provider/update-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

/***************************************************** */
//******Activity_Settings************************************************************
/* Home-Car-Street_module */
export const getPolicies = async()=>{
  const response = await API.get('/provider/policies')
  return response.data
}

export const deletePolicy = async(policyId)=>{
  const response = await API.delete(`/provider/policies/${policyId}`)
  return response.data
}

export const createPolicies = async(formData)=>{
  const response = await API.post ('/provider/policies' , formData)
  return response.data
}

export const editPolicies = async(formData)=>{
  const response = await API.post('/provider/policies/edit' ,formData )
  return response.data
}


// get review
export const getReview = async()=>{
  const response = await API.get('/provider/reviews')
  return response.data
}

export const getWorkplaces = async()=>{
  const response = await API.get('/provider/getAllAreas')
  return response.data
}

export const deleteArea = async(areaId)=>{
  const response = await API.post('/provider/deleteArea' , {id: areaId})
  return response.data
}

export const addArea = async(formData)=>{
  const response = await API.post('/provider/addArea',formData)
  return response.data
}

export const getSchedule = async()=>{
  const response = await API.get('/provider/schedule')
  return response.data.data
}

export const updateSchedule =async(formData)=>{
  const response = await API.post('/provider/updateSchedule' ,formData)
  return response.data
}

export const getRequiredDocuments = async()=>{
  const response = await API.get('/provider/required-documents')
  return response.data
}
export const uploadDocument = async(formData)=>{
  const response = await API.post('/provider/documents' ,formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

//---------------------------------------------------------------------------------------
/* property_module */

export const getBookingSetting = async()=>{
  const response = await API.get('/provider/booking-settings')
  return response.data
}

export const BookingSetting = async(formData)=>{
  const response = await API.post('/provider/booking-settings', formData)
  return response.data
}


export const getCalendarSetting = async()=>{
  const response = await API.get('/provider/calendar-settings')
  return response.data
}

export const CalendarSetting = async(formData)=>{
  const response = await API.post('/provider/calendar-settings' , formData )
  return response.data
}

export const getRuleSetting = async()=>{
  const response = await API.get('/provider/rules-settings')
  return response.data
}

export const RuleSetting = async(formData)=>{
  const response = await API.post('/provider/rules-settings' , formData)
  return response.data
}

export const getAdvancedSetting = async()=>{
  const response = await API.get('/provider/advanced-settings')
  return response.data
}

export const AdvancedSetting = async(formData)=>{
  const response = await API.post('/provider/advanced-settings' , formData)
  return response.data
}