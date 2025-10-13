import { useState, useRef, useEffect } from 'react';

export default function EmailOTPPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(45);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    const newOtp = [...otp];
    pastedData.forEach((char, index) => {
      if (index < 6 && !isNaN(char)) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);
  };

  const handleResendCode = () => {
    setTimer(45);
    setOtp(['', '', '', '', '', '']);
    console.log('Resending code...');
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    console.log('Verifying OTP:', otpCode);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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

      {/* Right Side - OTP Form Section */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Email OTP Verification
              </h1>
              <p className="text-gray-600 text-sm lg:text-base">
                We sent a code to info@example.com
              </p>
            </div>

            <div className="space-y-6">
              {/* OTP Input Boxes */}
              <div className="flex justify-center gap-2 sm:gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:outline-none transition"
                  />
                ))}
              </div>

              {/* Resend Code & Timer */}
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-gray-600">Didn't receive code:</span>
                {timer > 0 ? (
                  <>
                    <button
                      onClick={handleResendCode}
                      className="text-indigo-600 font-medium hover:underline"
                    >
                      Resend Code
                    </button>
                    <span className="text-red-600 font-medium">
                      {formatTime(timer)}
                    </span>
                  </>
                ) : (
                  <button
                    onClick={handleResendCode}
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    Resend Code
                  </button>
                )}
              </div>

              {/* Verify Button */}
              <button
                onClick={handleVerify}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Verify & Proceed
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