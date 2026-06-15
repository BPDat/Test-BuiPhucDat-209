"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";

interface ActionButtonsProps {
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
}

export default function ActionButtons({
  likesCount,
  commentsCount,
  sharesCount,
}: ActionButtonsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likesCount);
  const [animateHeart, setAnimateHeart] = useState(false);

  const handleLikeClick = () => {
    setAnimateHeart(true);
    setTimeout(() => setAnimateHeart(false), 300);

    if (isLiked) {
      setIsLiked(false);
      setCurrentLikes((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setCurrentLikes((prev) => prev + 1);
    }
  };

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
  };

  return (
    <div className="absolute right-3 bottom-28 md:bottom-24 flex flex-col items-center space-y-5 z-20 text-white select-none">
      <div className="flex flex-col items-center">
        <button
          onClick={handleLikeClick}
          className={`flex items-center justify-center w-11 h-11 rounded-full bg-zinc-800/40 hover:bg-zinc-800/60 backdrop-blur-sm transition-all duration-200 ${
            animateHeart ? "scale-125" : ""
          }`}
        >
          <Heart
            className={`w-6 h-6 transition-colors duration-200 ${
              isLiked 
                ? "text-red-500 fill-red-500 stroke-red-500" 
                : "text-white fill-transparent stroke-white"
            }`}
          />
        </button>
        <span className="text-xs font-semibold mt-1.5 drop-shadow-md text-zinc-100">
          {formatCount(currentLikes)}
        </span>
      </div>

      <div className="flex flex-col items-center">
        <button className="flex items-center justify-center w-11 h-11 rounded-full bg-zinc-800/40 hover:bg-zinc-800/60 backdrop-blur-sm transition-colors duration-200 cursor-pointer">
          <MessageCircle className="w-6 h-6 text-white stroke-white" />
        </button>
        <span className="text-xs font-semibold mt-1.5 drop-shadow-md text-zinc-100">
          {formatCount(commentsCount)}
        </span>
      </div>

      <div className="flex flex-col items-center">
        <button className="flex items-center justify-center w-11 h-11 rounded-full bg-zinc-800/40 hover:bg-zinc-800/60 backdrop-blur-sm transition-colors duration-200 cursor-pointer">
          <Share2 className="w-6 h-6 text-white stroke-white fill-transparent" />
        </button>
        <span className="text-xs font-semibold mt-1.5 drop-shadow-md text-zinc-100">
          {formatCount(sharesCount)}
        </span>
      </div>


      <div className="pt-2">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-zinc-900 to-zinc-700 p-1.5 border border-zinc-600 animate-spin duration-3000 ease-linear flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-black border border-zinc-800 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
