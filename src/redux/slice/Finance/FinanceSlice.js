import { deleteTransaction, getPaymentsData, getTaxesData, getTransactionsOverview, getTransactionsTaxes, getTransactionsWallet, getRevenueChartData, getYearsDrowpdown } from "@/redux/api/Finance/FinanceApi";
// import { create } from "@mui/material/styles/createTransitions";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Get payments data (finance cards)
export const getPaymentsDataThunk = createAsyncThunk(
  'finance/getPaymentsData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPaymentsData();
      // console.log('getPaymentsDataThunk', response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch finance data");
    }
  }
);

// get payment transaction  (table for finance overview)
export const getTransactionsOverviewThunk = createAsyncThunk(
  'finance/getTransactionsOverviewThunk' ,
  async({page = 1, filters = {}} , {rejectWithValue})=>{
    try{
      const response = await getTransactionsOverview(page, filters)
      // console.log('getTransactionsOverviewThunk' , response);
      return {
        payments: response.payments,
        pagination: response.pagination
      }
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to fetch finance data");
    }
  }
)


// get taxes data (cards for finance taxes)
export const getTaxesDataThunk = createAsyncThunk(
  'finance/getTaxesDataThunk' ,
    async(_ ,{rejectWithValue})=>{
      try{
        const response = await getTaxesData()
        // console.log('getTaxesDataThunk' , response.data);
        return response.data
      }catch(error){
        return rejectWithValue(error.response?.data || "Failed to fetch finance data");
      }
    }
)


// get taxes transaction  (table for finance taxes)
export const getTransactionsTaxesThunk = createAsyncThunk(
  'finance/getTransactionsTaxesThunk' ,
  async(page = 1 ,{rejectWithValue})=>{
    try{
      const response = await getTransactionsTaxes(page)
      console.log('getTransactionsTaxesThunk' , response.taxes);
      return {
        taxes: response.taxes,
        pagination: response.pagination
      }
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to fetch finance data");
    }
  }
)

// get wallet transaction  (table for finance wallet)
export const getTransactionsWalletThunk = createAsyncThunk(
  'finance/getTransactionsWalletThunk' ,
  async({ page = 1, status = '' } = {}, {rejectWithValue})=>{
    try{
      const response = await getTransactionsWallet(page, status);
      console.log('getTransactionsWalletThunk', response);
      return {
        transactions: response.data.transactions,
        pagination: {
          current_page: response.data.current_page,
          last_page: response.data.last_page,
          per_page: response.data.per_page,
          total: response.data.total,
          from: response.data.from,
          to: response.data.to
        }
      }
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to fetch finance data");
    }
  }
)

// delete transaction (wallet transactions)
export const deleteTransactionThunk = createAsyncThunk(
  'finance/deleteTransactionThunk',
  async(transactionId, {rejectWithValue})=>{
    try{
      await deleteTransaction(transactionId);
      return transactionId;
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to delete transaction");
    }
  }
)



// Get revenue chart data
export const getRevenueChartDataThunk = createAsyncThunk(
  'finance/getRevenueChartData',
  async ({ year, filter }, { rejectWithValue }) => {
    try {
      const response = await getRevenueChartData({ year, filter });
      return response;
    } catch (error) {
      console.log('error', error);
      return rejectWithValue(error.response?.data || "Failed to fetch chart data");
    }
  }
);

// get the years of dropdown in income analysis chart
export const getYearsDrowpdownThunk = createAsyncThunk(
  'finance/getYearsDrowpdown',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getYearsDrowpdown();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch years");
    }
  }
);


const initialState = {
  paymentsData: null,
  TransactionsData:[],
  TransactionsPagination: null,
  TaxesData:null,
  TaxesTransactionsData:[],
  TaxesPagination: null,
  WalletTransactionsData:[],
  WalletPagination: null,
  yearOfChart:null,
  revenueChartData: null,
  loading: false,
  error: null,
};

const FinanceSlice = createSlice({
  name: 'Finance',
  initialState,
  reducers: {
    resetFinance: (state) => {
      state.paymentsData = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Payments Data
      .addCase(getPaymentsDataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentsDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentsData = action.payload;
      })
      .addCase(getPaymentsDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get payment transaction  (table for finance overview)
      .addCase(getTransactionsOverviewThunk.pending , (state)=>{
        state.loading = true ;
        state.error = null;
      })
      .addCase(getTransactionsOverviewThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.TransactionsData = action.payload.payments;
        state.TransactionsPagination = action.payload.pagination;
      })
      .addCase(getTransactionsOverviewThunk.rejected , (state , action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      // get taxes data (cards for finance taxes)
      .addCase(getTaxesDataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTaxesDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.TaxesData = action.payload;
      })
      .addCase(getTaxesDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    // get taxes transaction  (table for finance taxes)
    .addCase(getTransactionsTaxesThunk.pending , (state)=>{
        state.loading = true ;
        state.error = null;
      })
      .addCase(getTransactionsTaxesThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.TaxesTransactionsData = action.payload.taxes;
        state.TaxesPagination = action.payload.pagination;
      })
      .addCase(getTransactionsTaxesThunk.rejected , (state , action)=>{
        state.loading = false;
        state.error = action.payload;
      })
     // get wallet transaction  (table for finance wallet)
      .addCase(getTransactionsWalletThunk.pending , (state)=>{
        state.loading = true ;
        state.error = null;
      })
      .addCase(getTransactionsWalletThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.WalletTransactionsData = action.payload.transactions;
        state.WalletPagination = action.payload.pagination;
      })
      .addCase(getTransactionsWalletThunk.rejected , (state , action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      // delete transaction (wallet transactions)
      .addCase(deleteTransactionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTransactionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.WalletTransactionsData = state.WalletTransactionsData.filter(
          (transaction) => transaction.id !== action.payload
        );
      })
      .addCase(deleteTransactionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //get the years of drowpdown in income analysis chart
      .addCase(getYearsDrowpdownThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getYearsDrowpdownThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.yearOfChart = action.payload;
      })
      .addCase(getYearsDrowpdownThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // Get Revenue Chart Data
      .addCase(getRevenueChartDataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRevenueChartDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.revenueChartData = action.payload;
      })
      .addCase(getRevenueChartDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetFinance } = FinanceSlice.actions;
export default FinanceSlice.reducer;