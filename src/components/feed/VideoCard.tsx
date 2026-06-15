"use client";

import { VideoItem } from "@/types/video";
import VideoPlayer from "./VideoPlayer";
import VideoOverlay from "./VideoOverlay";
import ActionButtons from "./ActionButtons";

interface VideoCardProps {
  video: VideoItem;
  isActive: boolean;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

export default function VideoCard({ video, isActive, isMuted, setIsMuted }: VideoCardProps) {
  return (
    <div
      data-video-id={video.id}
      className="w-full h-dvh shrink-0 flex justify-center bg-zinc-950 snap-start relative overflow-hidden"
    >

      <div className="relative w-full max-w-[480px] h-full bg-black md:border-x md:border-zinc-800 flex flex-col justify-between shadow-2xl">
        <VideoPlayer 
          videoUrl={video.videoUrl} 
          isActive={isActive} 
          isMuted={isMuted}
          setIsMuted={setIsMuted}
        />

        <VideoOverlay authorName={video.authorName} description={video.description} />

        <ActionButtons
          likesCount={video.likesCount}
          commentsCount={video.commentsCount}
          sharesCount={video.sharesCount}
        />
      </div>
    </div>
  );
}
