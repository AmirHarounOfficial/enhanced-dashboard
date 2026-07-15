import API from "../../../../config/api"

//get all worker
export  const getAllWorkers = async(params = {})=>{
  const response = await API.get('/provider/getHandymen',{
    params: params
  })
  return response.data ;
}

//get designations 
export const getDesignations = async()=>{
  const response = await API.get('/designations')
  return response.data.data

}

//add new worker
export const addWorker = async(formData)=>{
  const response = await API.post('/createHandyman',formData,{
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  // console.log('addWorker' ,  response.data);
  return response.data;
}

//get worker by ID
export const getWorkerById = async(worker_id)=>{
  const response = await API.get(`/provider/handyman/${worker_id}`)
  // console.log(response.data);
  return response.data;
}

//update worker by id
export const UpdateWorker = async(formData)=>{
  const response = await API.post(`/updateHandyman`,formData , {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  console.log('UpdateWorker',response.data);
  return response.data
}

//delete worker
export const deleteWorker = async (worker_id) => {
  const response = await API.post('/removeHandyman', { id: worker_id });
  return response.data;
}
