import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppointmentPage from './pages/AppointmentPage'
import DoctorGrid from './pages/DoctorGrid'
import EmailOTPPage from './pages/UserLogIn/EmailOTP'
import EmailSentPage from './pages/UserLogIn/EmailSentPage'
import ForgotPasswordPage from './pages/UserLogIn/ForgotPasswordPage'
import PatientGrid from './pages/PatientGrid'
import RegisterPage from './pages/UserLogIn/RegisterPage'
import ResetPasswordPage from './pages/UserLogIn/ResetPasswordPage'
import SignInPage from './pages/UserLogIn/SignInPage'
import SuccessPage from './pages/UserLogIn/SuccessPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Auth routes: full width forms without sidebar */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/email-sent" element={<EmailSentPage />} />
          <Route path="/email-otp" element={<EmailOTPPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/success" element={<SuccessPage />} />

          {/* Main app routes - pages render their own sidebar when needed */}
          <Route path="/" element={<SignInPage />} />
          <Route path="/appointments" element={<AppointmentPage />} />
          <Route path="/doctors" element={<DoctorGrid />} />
          <Route path="/patients" element={<PatientGrid />} />
          {/* fallback to signin */}
          <Route path="*" element={<SignInPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
