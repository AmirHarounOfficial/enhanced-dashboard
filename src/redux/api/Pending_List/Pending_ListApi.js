import API from "../../../../config/api"

export const getwaitlistAnalysis = async()=>{
  const response = await API.get('/provider/waitlist/analysis')
  return response.data
}

export const getWaitingList = async(params = {})=>{
  const response = await API.get('/provider/waitlist/get', { params })
  return response.data
}

export const addWaitlist = async(formData)=>{
  const response = await API.post('/provider/waitlist/add',formData)
  return response.data
}

export const scanWaitlist = async(formData)=>{
  const response = await API.post('/provider/waitlist/scan',formData)
  return response.data
}

export const seatedWaitlist = async(formData)=>{
  const response = await API.post('/provider/waitlist/seated',formData)
  return response.data
}

export const arrivedWaitlist = async(formData)=>{
  const response = await API.post('/provider/waitlist/arrived',formData)
  return response.data
}

export const getScanWaitlist = async(formData)=>{
  const response = await API.get('/provider/waitlist/get-scanned',{
    params: {
        qr_token: formData.qr_token,
      },
  })
  return response.data
}


export const delayWaitlist = async(formData)=>{
  const response = await API.post('/provider/waitlist/delay',formData)
  return response.data
}
