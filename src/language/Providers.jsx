"use client";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({ children }) {
  return (
    <>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          {children}
        </I18nextProvider>
      </Provider>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}
