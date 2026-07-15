import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/Auth/AuthSlice";
import servicesReducer from "./slice/Services/ServicesSlice";
import workerReducer from "./slice/Workers/WorkersSlice";
import financeReducer from "./slice/Finance/FinanceSlice";
import settingReducer from './slice/Setting/SettingSlice.js';
import HomeReducer from './slice/Home/HomeSlice';
import requestsReducer from './slice/Requests/RequestsSlice'
import hallsReducer from './slice/Halls/HallsSlice'
import Pending_ListReducer from './slice/Pending_List/Pending_ListSlice'
import MenusReducer from './slice/Menus/MenusSlice'

export const store = configureStore({
  reducer:{
    auth: authReducer,
    services:servicesReducer,
    workers:workerReducer,
    finance: financeReducer,
    setting:settingReducer,
    Home:HomeReducer,
    requests:requestsReducer,
    halls:hallsReducer,
    PendingList:Pending_ListReducer,
    Menus:MenusReducer

  }
})