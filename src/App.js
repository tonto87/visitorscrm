import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import Main from "./Main";
import Login from "./components/Pages/Login/Login";
import { AuthProvider } from "./contexts/auth/AuthContext";
import store from "./store";
import { AppPaths } from "./constants/appPaths";
import { isLoggedIn } from "./helpers/userHelpers";

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import Forbidden from "./components/Pages/Errors/403Error";
import InternalServer from "./components/Pages/Errors/500Error";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: 10 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Provider store={store}>
          <ToastContainer position="top-right" />
          <Router
            future={{
              v7_startTransition: true,
            }}
          >
            <Routes>
              <Route path={AppPaths.login} element={<Login />} />
              <Route path="*" element={<PrivateRoute element={<Main />} />} />
              <Route path="/403" element={<Forbidden />} />
              <Route path="/500" element={<InternalServer />} />
            </Routes>
          </Router>
        </Provider>
      </AuthProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

function PrivateRoute({ element }) {
  return isLoggedIn() ? element : <Navigate to={AppPaths.login} />;
}

export default App;
