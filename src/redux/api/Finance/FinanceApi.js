import API from "../../../../config/api";

// Get payment data (cards for finance overview)
export const getPaymentsData = async () => {
  const provider_id = localStorage.getItem("provider_id");
  const response = await API.post('/provider/payments-data', {
    provider_id: provider_id
  });
  // console.log('getPaymentsData', response.data);
  return response.data;
};

// get payment transaction  (table for finance overview)
export const getTransactionsOverview = async (page = 1, filters = {}) => {
  const queryParams = new URLSearchParams({
    page,
    ...filters
  }).toString();
  const response = await API.get(`/provider/service-payments?${queryParams}`);
  return response.data;
};

// get taxes data (cards for finance taxes)
export const getTaxesData = async () =>{
  const response = await API.get('/provider/getTransactionsData')
  return response.data
}

// get taxes transaction  (table for finance taxes)
export const getTransactionsTaxes = async(page = 1)=>{
  const response = await API.get(`/provider/taxes?page=${page}`)
  return response.data
}

// get wallet transaction  (table for finance wallet)
export const getTransactionsWallet = async(page = 1, status = '')=>{
  const params = new URLSearchParams({ page });
  if (status) params.append('status', status);
  
  const response = await API.get(`/provider/getTransactions?${params.toString()}`)
  return response.data
}

// delete transaction (wallet transactions)
export const deleteTransaction = async(transactionId)=>{
  const response = await API.post(`/transactions/delete`, { id: transactionId })
  return response.data
}

// Get revenue chart data
export const getRevenueChartData = async ({ year, filter }) => {
  const response = await API.get(`/bookings/revenue-chart`, {
    params: { year, filter }
  });
  return response.data;
}

//get the years of drowpdown in income analysis chart
export const getYearsDrowpdown = async()=>{
  const response = await API.get('/analytics/available-years')
  return response.data
}