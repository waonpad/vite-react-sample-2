import React from "react";
import ReactDOM from "react-dom/client";
import { AppProvider } from "./providers/app-provider.tsx";
import { AppRoutes } from "./routes/index.tsx";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  </React.StrictMode>,
);
