"use client";

import { useRef, useState } from "react";
import { VideoItem } from "@/types/video";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import VideoCard from "./VideoCard";

interface VideoFeedProps {
  videos: VideoItem[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [isMuted, setIsMuted] = useState(false);

  const activeId = useIntersectionObserver({
    containerRef,
    selector: "[data-video-id]",
    options: {
      threshold: 0.6,
      root: null, 
    },
  });


  const currentActiveId = activeId || (videos.length > 0 ? videos[0].id : null);

  return (
    <div
      ref={containerRef}
      className="h-dvh w-full overflow-y-scroll snap-y snap-mandatory scrollbar-none bg-zinc-950"
    >
      {videos.map((video, index) => (
        <VideoCard
          key={video.id}
          video={video}
          isActive={video.id === currentActiveId}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
        />
      ))}
    </div>
  );
}
