"use client";

import { useState } from "react";

interface VideoOverlayProps {
  authorName: string;
  description: string;
}

export default function VideoOverlay({ authorName, description }: VideoOverlayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxChars = 80;
  const isLongDescription = description.length > maxChars;


  const renderDescription = (text: string) => {
    return text.split(" ").map((word, index) => {
      if (word.startsWith("#")) {
        return (
          <span key={index} className="text-red-400 font-semibold hover:underline cursor-pointer mr-1">
            {word}
          </span>
        );
      }
      return word + " ";
    });
  };

  const handleToggleDescription = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsExpanded(!isExpanded);
  };

  const textToShow = isLongDescription && !isExpanded
    ? description.slice(0, maxChars) + "..."
    : description;

  return (
    <div className="absolute bottom-0 left-0 w-full p-4 pb-20 md:pb-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white flex flex-col justify-end z-10 pointer-events-none">
      <div className="flex items-center space-x-2 mb-2 pointer-events-auto">
        <div className="w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center border-2 border-white font-bold text-sm text-white uppercase select-none">
          {authorName.substring(0, 2)}
        </div>
        <p className="font-bold text-base hover:underline cursor-pointer">
          @{authorName}
        </p>
      </div>

      <div className="text-sm text-zinc-200 leading-relaxed max-w-[85%] pointer-events-auto">
        <p className="inline">
          {renderDescription(textToShow)}
        </p>
        {isLongDescription && (
          <button
            onClick={handleToggleDescription}
            className="text-white font-bold hover:underline cursor-pointer ml-1 inline-block focus:outline-none"
          >
            {isExpanded ? "Ẩn bớt" : "Xem thêm"}
          </button>
        )}
      </div>
    </div>
  );
}
