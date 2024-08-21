import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { AuthUserProvider } from "./context/Authuser.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthUserProvider>
        <Toaster />
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthUserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
