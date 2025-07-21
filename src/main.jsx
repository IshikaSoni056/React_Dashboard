
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";
import "./index.css"; // You can use TailwindCSS
import { StrictMode } from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
