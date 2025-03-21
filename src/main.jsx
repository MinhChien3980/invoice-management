import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateInvoice from "./pages/invo/createInvoice.jsx";
import UpdateInvoice from "./pages/invo/updateInvoice.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<CreateInvoice />} />
        <Route path="/update" element={<UpdateInvoice />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
