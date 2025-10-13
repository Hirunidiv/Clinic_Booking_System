import { Check } from 'lucide-react';

export default function EmailSentPage() {
  const handleResetPassword = () => {
    console.log('Navigate to reset password');
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

      {/* Right Side - Success Message Section */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-10">
            <div className="text-center">
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-white" strokeWidth={3} />
                </div>
              </div>

              {/* Success Message */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                Email Sent!
              </h1>
              <p className="text-gray-600 text-sm lg:text-base mb-8">
                Check your email & change your password
              </p>

              {/* Reset Password Button */}
              <button
                onClick={handleResetPassword}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Reset Password
              </button>
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