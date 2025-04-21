// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Br } from "react-router-dom";
import AppContextProvider from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  /* <StrictMode>
    <App />
  </StrictMode>*/
  <Br>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </Br>
);
