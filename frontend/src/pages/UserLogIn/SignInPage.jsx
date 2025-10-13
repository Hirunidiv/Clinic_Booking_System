import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="max-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Image Section */}
      <div className="lg:w-1/2 bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-800 p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-400 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="max-w-md w-full z-10">
          <img
            src="/start/register.jpg"
            alt="Medical Professional"
            className="w-full h-auto rounded-2xl shadow-2xl object-cover"
          />
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Sign In
              </h1>
              <p className="text-gray-600 text-sm lg:text-base">
                Please enter below details to access the dashboard
              </p>
            </div>

            <div className="space-y-5">
              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email Address"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="************"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Remember Me
                  </label>
                </div>
                <a href="#" className="text-sm text-red-600 hover:underline font-medium">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Login
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">OR</span>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center text-sm text-gray-600">
                Don't have an account yet?{' '}
                <a href="#" className="text-indigo-600 font-medium hover:underline">
                  Register
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 text-center text-sm text-gray-500">
            Copyright @2025 - Fuchsius
          </div>
        </div>
      </div>
    </div>
  );
}