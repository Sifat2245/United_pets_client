import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import { ModalProvider } from "./context/ModalProvider.jsx";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          <Toaster position="top-center" />
          <RouterProvider router={router}></RouterProvider>
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
