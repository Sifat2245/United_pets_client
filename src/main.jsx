import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import { ModalProvider } from "./context/ModalProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
     <ModalProvider>
       <RouterProvider router={router}></RouterProvider>
     </ModalProvider>
    </AuthProvider>
  </StrictMode>
);
