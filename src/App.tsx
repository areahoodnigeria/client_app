import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Verification from "./pages/Verification";
import Features from "./pages/Features";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./pages/Logout.tsx";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Guidelines from "./pages/Guidelines";
import Safety from "./pages/Safety";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";
import Loader from "./components/Loader";
import { useEffect } from "react";
import useAuthStore from "./store/authStore";
import DashboardRouter from "./pages/DashboardRouter.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";

function App() {
  const { token, user, fetchUser } = useAuthStore();
  useEffect(() => {
    if (token && !user) {
      fetchUser().catch(() => {
        // handled via interceptor
      });
    }
  }, [token, user, fetchUser]);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* <Route element={<Layout />}> */}
        <Route path="/" element={<Index />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          {/* Single dashboard entry */}
          <Route path="/dashboard/*" element={<DashboardRouter />} />
        </Route>

        {/* Common */}
        <Route element={<ProtectedRoute redirectPath="/login" />}>
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/guidelines" element={<Guidelines />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/loading" element={<Loader />} />
        {/* </Route> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
