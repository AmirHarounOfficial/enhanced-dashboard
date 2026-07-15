import API from "../../../../config/api"


export const getCategories = async(page = 1)=>{
  const response = await API.get('/provider/menu-categories', {
    params: { page }
  })
  return response.data
}

export const getItems = async()=>{
  const response = await API.get('/provider/menu-items')
  return response.data
}

export const addCategory = async(formData)=>{
  const response = await API.post('/provider/menu-categories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export const getItemById = async(id)=>{
  const response = await API.get(`/provider/menu-item/menu-categories/${id}`)
  return response.data
}

export const getItemsDetails = async(id)=>{
  const response = await API.get(`/provider/menu-items/${id}`)
  return response.data
}


export const addItem = async(formData)=>{
  const response = await API.post('/provider/menu-items/create',formData,{
    headers: { 'Content-Type': 'multipart/form-data' },
  }
  )
  return response.data
}
