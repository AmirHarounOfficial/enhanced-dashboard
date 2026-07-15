import API from "../../../../config/api"

/*********Hall */
//----------------

export const getHalls = async () => {
  const response = await API.get('/provider/hall')
  return response.data;
}

export const getHallType = async () => {
  const response = await API.get('/provider/hall/type')
  return response.data;
}

export const getHallById = async (id) => {
  const response = await API.get(`/provider/restaurant/hall/${id}`)
  return response.data;
}

export const EditHall = async (id, data) => {
  const response = await API.post(`/provider/restaurant/hall/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export const AddHall = async (formData) => {
  const response = await API.post('/provider/restaurant/hall', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export const toggleViews = async (id) => {
  console.log("PATCH REQUEST:", id);
  const response = await API.patch(`/provider/views/${id}/toggle`)
  return response.data;
}
export const dublicateHall = async (formData) => {
  const response = await API.post('/provider/dublicate-hall', formData)
  return response.data;
}

/*********Tables */
//----------------
export const getTables = async(id)=>{
  const response = await API.get(`/provider/restaurant/tables/hall/${id}`)
  return response.data
}

export const addTable = async(id , formData)=>{
  const response = await API.post(`/provider/restaurant/tables/hall/${id}`,formData)
  return response.data
}

export const getTage = async()=>{
  const response = await API.get('/provider/Tag')
  return response.data
}

export const getHallsView = async(id)=>{
  const response = await API.get(`/provider/halls/${id}/views`)
  return response.data
}



export const getRestaurantTable = async(id)=>{
  const response = await API.get(`/provider/restaurant/tables/${id}`)
  return response.data
}

export const EditRestaurantTable = async(id , formData)=>{
  const response = await API.post(`/provider/restaurant/tables/${id}`,formData)
  return response.data
}

export const DeleteTable = async(Tableid)=>{
  const response = await API.delete(`/provider/restaurant/tables/${Tableid}`)
  return response.data
}

export const getViews = async(id)=>{
  const response = await API.get(`/provider/halls/${id}/views`)
  return response.data
}

export const getHallView = async()=>{
  const response = await API.get('/provider/hall-views')
  return response.data
}

export const addHallView = async(Hallid,formData)=>{
  const response = await API.post(`/provider/halls/${Hallid}/views` , formData)
  return response.data
}

export const deleteView = async(id)=>{
  const response = await API.delete(`/provider/views/${id}/delete`)
  return response.data
}

export const getViewsById = async(id)=>{
  const response = await API.get(`/provider/show/views/${id}`)
  return response.data
}

export const editViews = async(id , formData)=>{
  const response = await API.post(`/provider/views/${id}/update`,formData)
  return response.data
}

/********* Hall Layout *********/
export const getHallLayout = async (hallId) => {
  const response = await API.get(`/provider/restaurant/hall/${hallId}/layout`)
  return response.data
}

export const randomizeHallLayout = async (hallId) => {
  const response = await API.post(`/provider/restaurant/hall/${hallId}/layout/randomize`)
  return response.data
}

export const saveHallLayout = async (hallId, data) => {
  const response = await API.post(`/provider/restaurant/hall/${hallId}/layout/save`, data)
  return response.data
}