import { VideoItem } from "@/types/video";

export const mockVideos: VideoItem[] = [
  {
    id: "video-1",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    authorName: "bunny_adventures",
    description: "Big Buck Bunny kể câu chuyện về một chú thỏ khổng lồ có một ngày bị hủy hoại bởi ba loài gặm nhấm bắt nạt. #bunny #cartoon #classic",
    likesCount: 15,
    commentsCount: 382,
    sharesCount: 924,
  },
  {
    id: "video-2",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    authorName: "casual_dinosaur",
    description: "Chỉ là một con khủng long vui vẻ tận hưởng những rung cảm cuối tuần! Chúc mọi người thứ sáu vui vẻ!!!!!! #dinosaur #fridayvibes #animation",
    likesCount: 81,
    commentsCount: 147,
    sharesCount: 420,
  },
  {
    id: "video-3",
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    authorName: "sintel_official",
    description: "Short #blender #3d #fantasy",
    likesCount: 23999,
    commentsCount: 983,
    sharesCount: 1205,
  },
];
