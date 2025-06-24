import React, { useEffect, useState } from 'react';
import { companyName } from '../../data/constants';

const icons = ['🌐', '🤖', '🎒', '✈️'];
const captions = [
  'Planning smart routes...',
  'AI is designing your itinerary...',
  'Packing recommendations...',
  'Ready to take off!',
];

export default function EscapeNFlyLoader() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // start fade-out

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % icons.length);
        setFade(false); // fade-in after update
      }, 400);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0b0c1b]/95 flex flex-col justify-center items-center text-center z-[1]">
      <div className="flex items-center cursor-pointer">
              <img src="/logo/darkLogo.png" alt="Escape n fly" className="h-16 object-contain" />
            </div>

      <div className="relative w-20 h-20 mb-4">
        <div className="w-full h-full border-4 border-[#00c2ff44] border-t-[#00f7ff] rounded-full animate-spin" />
        <div
          className={`absolute top-1/2 left-1/2 text-2xl text-[#00f7ff] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-400 ${
            fade ? 'opacity-0 -translate-y-[60%]' : 'opacity-100'
          }`}
        >
          {icons[index]}
        </div>
      </div>

      <div className={`text-[1.1rem] text-gray-300 tracking-wide mb-1 ${
          fade ? 'opacity-0' : 'opacity-100'
        }`}>
        {/* Smart Travel Engine Loading... */}
        Crafting your perfect journey...
      </div>

      <div
        className={`text-sm text-gray-400 h-5 transition-opacity duration-400 `}
      >
        {/* {captions[index]} */}
        Hold tight as we finalize your custom travel experience.<br/>
        Do not refresh and go back.<br/>
        Feel free to connect with us on <a href="https://wa.me/+919851739851?utm_source=web" className="text-[#00f7ff] hover:underline" target="_blank" rel="noopener noreferrer">WhatsApp</a> for support.

      </div>
      {companyName && (
        <div className="absolute bottom-16 text-xs text-gray-500">
          Powered by {companyName}
        </div>
      )}
    </div>
  );
}
