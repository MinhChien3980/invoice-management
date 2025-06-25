import './utils/globalPolyfill';
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateInvoice from "./pages/invo/createInvoice.jsx";
import UpdateInvoice from "./pages/UpdateInvoice.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import {NotificationProvider} from "./context/NotificationContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <NotificationProvider>
                    <Navbar />
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        
                        {/* Protected Routes */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/" element={<App />} />
                            <Route path="/update/:id" element={<UpdateInvoice />} />
                        </Route>
                        
                        {/* Admin Routes */}
                        <Route element={<ProtectedRoute requiredRoles={["ROLE_ADMIN"]} />}>
                            <Route path="/create" element={<CreateInvoice />} />
                        </Route>
                    </Routes>
                </NotificationProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);
