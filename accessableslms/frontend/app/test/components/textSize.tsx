// components/FontSizeAdjuster.tsx
'use client';
import { useState } from "react";

const FontSizeAdjuster = () => {
  // State to control font size (Tailwind has discrete sizes, so we'll map slider value)
  const [fontSize, setFontSize] = useState(16); // starting at 16px

  // Convert px to Tailwind style classes dynamically
  const getFontClass = (size: number) => {
    if (size <= 12) return "text-xs";
    if (size <= 14) return "text-sm";
    if (size <= 16) return "text-base";
    if (size <= 18) return "text-lg";
    if (size <= 20) return "text-xl";
    if (size <= 24) return "text-2xl";
    if (size <= 30) return "text-3xl";
    if (size <= 36) return "text-4xl";
    if (size <= 48) return "text-5xl";
    return "text-6xl";
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Accessibility Font Size Test</h1>

      {/* Sample Text */}
      <p className={`${getFontClass(fontSize)} mb-6`}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>

      {/* Font size slider */}
      <div className="flex items-center space-x-4">
        <label htmlFor="font-size" className="font-medium">
          Font size: {fontSize}px
        </label>
        <input
          id="font-size"
          type="range"
          min="12"
          max="48"
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default FontSizeAdjuster;
