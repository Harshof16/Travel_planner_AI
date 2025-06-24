import React, { useRef, useEffect, useState } from "react";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Login: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (isOpen) {
      // Reset OTP and focus first input when opened
      setOtp(Array(6).fill(""));
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }
  }, [isOpen]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 5) otpRefs.current[index + 1]?.focus();
    } else if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
        
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          &times;
        </button>

        <div className="flex">
          {/* Stepper */}
          <div className="relative mr-8">
            <div className="absolute left-3 top-6 h-[170px] w-px bg-gray-300"></div>

            <div className="flex items-center mb-16">
              <div className="z-10 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center">
                1
              </div>
              <span className="ml-3 text-sm font-medium text-gray-800 whitespace-nowrap">
                Enter Number
              </span>
            </div>

            <div className="flex items-center mb-16">
              <div className="z-10 w-6 h-6 rounded-full bg-gray-300 text-gray-500 text-xs font-semibold flex items-center justify-center">
                2
              </div>
              <span className="ml-3 text-sm font-medium text-gray-400 whitespace-nowrap">
                Send OTP
              </span>
            </div>

            <div className="flex items-center">
              <div className="z-10 w-6 h-6 rounded-full bg-gray-300 text-gray-500 text-xs font-semibold flex items-center justify-center">
                3
              </div>
              <span className="ml-3 text-sm font-medium text-gray-400 whitespace-nowrap">
                Confirm OTP
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              WhatsApp Number
            </label>
            <div className="relative mb-4">
              <input
                type="tel"
                placeholder="+1 234 567 8901"
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">📞</span>
            </div>

            <button className="w-full rounded-md bg-blue-400 py-2 text-sm font-medium text-white hover:bg-blue-500 mb-4">
              Send OTP
            </button>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Enter OTP
            </label>
            <div className="flex space-x-2 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  ref={(el) => (otpRefs.current[index] = el)}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-10 h-10 text-center border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>

            <button className="w-full rounded-md bg-blue-400 py-2 text-sm font-medium text-white hover:bg-blue-500">
              Confirm OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
