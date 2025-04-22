"use client";

"use client";
import React, { useEffect, useState } from "react";

const NEXT_STEPS_URL = "https://docs.google.com/document/d/1zB_DzccwusVWKBUGbtkoNSHvPfZoa1K6jcXJZJ1nIjs/edit?usp=sharing";

export default function AlertSlider() {
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!show || closed) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] flex items-end justify-end"
      style={{ pointerEvents: 'auto' }}
    >
      <div className="flex items-center gap-2 bg-white/90 border border-accent rounded-xl shadow-2xl px-5 py-2 min-w-[220px] max-w-xs sm:max-w-sm backdrop-blur-custom transition-all duration-500 animate-fade-in-down">
        <a
          href={NEXT_STEPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-primary hover:text-tertiary underline font-semibold text-sm truncate focus:outline-none focus:ring-2 focus:ring-accent"
        >
          🚀 Ready for next steps? <span className="font-bold">Click here</span>
        </a>
        <button
          onClick={() => setClosed(true)}
          aria-label="Close notification"
          className="ml-1 p-1 text-gray-400 hover:text-gray-700 transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6L14 14M14 6L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

