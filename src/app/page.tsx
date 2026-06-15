import Navigation from "@/components/navigation/Navigation";
import VideoFeed from "@/components/feed/VideoFeed";
import { mockVideos } from "@/data/mockVideos";

export default function Home() {
  return (
    <div className="flex w-screen h-dvh bg-black overflow-hidden text-white">
      <Navigation />

      <main className="flex-grow h-dvh relative overflow-hidden">
        <VideoFeed videos={mockVideos} />
      </main>
    </div>
  );
}
