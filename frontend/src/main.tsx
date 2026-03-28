import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppProvider } from "./context/AppContext.tsx";
import "leaflet/dist/leaflet.css";

export const authService = "http://localhost:5000";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="306023731092-cefbhfj9614vi7f93405l8gcs7h9pkon.apps.googleusercontent.com">
      <AppProvider>
          <App />
      </AppProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
