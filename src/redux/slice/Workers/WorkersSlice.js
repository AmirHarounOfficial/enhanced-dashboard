import { addWorker, getAllWorkers, getDesignations, getWorkerById, UpdateWorker, deleteWorker } from "@/redux/api/Workers/WorkersApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//get all workers
export const getAllWorkersThunk = createAsyncThunk(
  "workers/getAllWorkers",
  async (params, { rejectWithValue }) => {
    try {
      const response = await getAllWorkers(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get Designations
export const getDesignationsThunk = createAsyncThunk(
  'workers/getDesignationsThunk',
  async(_,{rejectWithValue})=>{
    try{
      const response = await getDesignations();
      return response
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      } 
  }
)

//add new worker
export const addWorkerThunk = createAsyncThunk(
  'worker/addWorkerThunk',
  async(formData , {rejectWithValue})=>{
    try{
      const response = await addWorker(formData)
      return response.data
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

//  get worker by id 
export const getWorkerByIdThunk = createAsyncThunk(
  'worker/getWorkerById',
  async(worker_id , {rejectWithValue})=>{
    try{
      const response = await getWorkerById(worker_id);
      // console.log('slice worker' , response);
      return response.handyman;
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

//update worker by id
export const UpdateWorkerThunk = createAsyncThunk(
  'worker/UpdateWorkerThunk' , 
  async(formData, { dispatch, rejectWithValue })=>{
    try{
      const response = await UpdateWorker(formData);
        console.log('UpdateWorkerThunk',response);
        const workerId = formData.get('id');
      if (workerId) {
        dispatch(getWorkerByIdThunk(workerId));
      }

      return response.handyman || response.data || response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

//delete worker
export const deleteWorkerThunk = createAsyncThunk(
  'worker/deleteWorkerThunk',
  async (worker_id, { dispatch, rejectWithValue }) => {
    try {
      const response = await deleteWorker(worker_id);
      dispatch(getAllWorkersThunk()); // Refresh the list
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



const initialState ={
  workers: [],
  addWorker:null ,
  worker :null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  getDesignations : null
}
const WorkersSlice = createSlice({
  name: "workers",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllWorkersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllWorkersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.workers = action.payload.handymen || [];
        state.currentPage = action.payload.meta?.current_page || 1;
        state.totalPages = action.payload.meta?.last_page || 1;
      })
      .addCase(getAllWorkersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ✅ Get designations
      .addCase(getDesignationsThunk.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(getDesignationsThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        state.getDesignations = action.payload
      })
      .addCase(getDesignationsThunk.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })
      // ✅ Add new worker
      .addCase(addWorkerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWorkerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.addWorker = action.payload;
      })
      .addCase(addWorkerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ✅ Single worker 
      .addCase(getWorkerByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWorkerByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.worker = action.payload;
      })
      .addCase(getWorkerByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ✅ Update service
      .addCase(UpdateWorkerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateWorkerThunk.fulfilled, (state, action) => {
        state.loading = false;
        // Do not update state.worker here to prevent data loss. 
        // The thunk dispatches getWorkerByIdThunk which will update state.worker with fresh data.
      })
      .addCase(UpdateWorkerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ✅ Delete worker
      .addCase(deleteWorkerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWorkerThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteWorkerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
})
export const { setPage } = WorkersSlice.actions;
export default WorkersSlice.reducer;
