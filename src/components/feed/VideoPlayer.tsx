"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string;
  isActive: boolean;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

export default function VideoPlayer({ videoUrl, isActive, isMuted, setIsMuted }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const progressContainerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isScrubbingRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayOverlay, setShowPlayOverlay] = useState(false);
  const [showPauseOverlay, setShowPauseOverlay] = useState(false);


  const startProgressLoop = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    const loop = () => {

      if (!isScrubbingRef.current) {
        const video = videoRef.current;
        const bar = progressBarRef.current;
        if (video && bar && video.duration) {
          const percent = (video.currentTime / video.duration) * 100;
          bar.style.width = `${percent}%`;
        }
      }
      animationFrameRef.current = requestAnimationFrame(loop);
    };
    
    animationFrameRef.current = requestAnimationFrame(loop);
  };

  const stopProgressLoop = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };


  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {

      video.muted = isMuted;
      

      video.play()
        .then(() => {
          setIsPlaying(true);
          startProgressLoop();
        })
        .catch((err) => {
          console.warn("Autoplay with audio prevented by browser, falling back to muted:", err);

          video.muted = true;
          setIsMuted(true);
          video.play()
            .then(() => {
              setIsPlaying(true);
              startProgressLoop();
            })
            .catch((playErr) => {
              console.error("Autoplay failed completely:", playErr);
              setIsPlaying(false);
            });
        });
    } else {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
      stopProgressLoop();
      if (progressBarRef.current) {
        progressBarRef.current.style.width = "0%";
      }
    }

    return () => {
      stopProgressLoop();
    };
  }, [isActive]);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      stopProgressLoop();
      setShowPauseOverlay(true);
      setTimeout(() => setShowPauseOverlay(false), 500);
    } else {
      video.play()
        .then(() => {
          setIsPlaying(true);
          startProgressLoop();
          setShowPlayOverlay(true);
          setTimeout(() => setShowPlayOverlay(false), 500);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const newMuted = !isMuted;
    video.muted = newMuted;
    setIsMuted(newMuted);
  };


  const seekTo = (clientX: number) => {
    const video = videoRef.current;
    const container = progressContainerRef.current;
    if (!video || !container || !video.duration) return;

    const rect = container.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const width = rect.width;
    let percentage = clickX / width;


    if (percentage < 0) percentage = 0;
    if (percentage > 1) percentage = 1;

    video.currentTime = percentage * video.duration;
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${percentage * 100}%`;
    }
  };


  const handleProgressMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    isScrubbingRef.current = true;
    seekTo(e.clientX);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      seekTo(moveEvent.clientX);
    };

    const handleMouseUp = () => {
      isScrubbingRef.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };


  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    isScrubbingRef.current = true;
    if (e.touches[0]) {
      seekTo(e.touches[0].clientX);
    }

    const handleTouchMove = (moveEvent: TouchEvent) => {
      if (moveEvent.touches[0]) {
        seekTo(moveEvent.touches[0].clientX);
      }
    };

    const handleTouchEnd = () => {
      isScrubbingRef.current = false;
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleProgressClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    seekTo(e.clientX);
  };

  return (
    <div 
      className="relative w-full h-full cursor-pointer flex items-center justify-center bg-black overflow-hidden"
      onClick={handleVideoClick}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        loop
        playsInline
        muted={isMuted}
      />


      {showPlayOverlay && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="bg-black/50 p-5 rounded-full scale-90 animate-out fade-out zoom-out-50 duration-500">
            <Play className="w-12 h-12 text-white fill-white" />
          </div>
        </div>
      )}


      {showPauseOverlay && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="bg-black/50 p-5 rounded-full scale-90 animate-out fade-out zoom-out-50 duration-500">
            <Pause className="w-12 h-12 text-white fill-white" />
          </div>
        </div>
      )}


      {!isPlaying && !showPauseOverlay && !showPlayOverlay && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 bg-black/20">
          <Play className="w-16 h-16 text-white/70 fill-white/20 drop-shadow-lg" />
        </div>
      )}


      <button
        onClick={handleMuteToggle}
        className="absolute top-4 right-4 z-20 bg-black/40 hover:bg-black/60 text-white p-2.5 rounded-full backdrop-blur-sm transition-all duration-200"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-white" />
        ) : (
          <Volume2 className="w-5 h-5 text-white" />
        )}
      </button>


      <div 
        ref={progressContainerRef}
        className="absolute bottom-0 left-0 w-full h-3 cursor-pointer z-30 flex items-end group bg-transparent hover:bg-black/10"
        onClick={handleProgressClick}
        onMouseDown={handleProgressMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="w-full h-1 group-hover:h-1.5 bg-white/20 transition-all duration-100 relative">
          <div 
            ref={progressBarRef}
            className="h-full bg-red-500"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </div>
  );
}
