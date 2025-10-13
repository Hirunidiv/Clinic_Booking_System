import { useState } from 'react';
import { Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    console.log('Password reset requested for:', email);
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
                Forgot Password
              </h1>
              <p className="text-gray-600 text-sm lg:text-base">
                No worries, we'll send you reset instructions
              </p>
            </div>

            <div className="space-y-6">
              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email Address"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Submit
              </button>

              {/* Return to Login */}
              <div className="text-center text-sm text-gray-600">
                Return to{' '}
                <a href="#" className="text-indigo-600 font-medium hover:underline">
                  Login
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