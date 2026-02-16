"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface YouTubeVideoPlayerProps {
  videoUrl: string;
  thumbnail?: string;
}

const getYoutubeId = (url: string) => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const YouTubeVideoPlayer: React.FC<YouTubeVideoPlayerProps> = ({
  videoUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getYoutubeId(videoUrl);

  if (!videoId) return null;

  console.log(videoId)

  return (
    <div className="w-full max-w-200 mx-auto">
      <div className="relative w-full aspect-video rounded overflow-hidden bg-black">
        {!isPlaying ? (
          <>
            {/* Thumbnail */}
            <Image
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt="YouTube Video"
              fill
              className="object-cover"
            />

            {/* Play Button */}
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-600 flex items-center justify-center">
                <Play className="text-white w-8 h-8 md:w-10 md:h-10" />
              </div>
            </button>
          </>
        ) : (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
};

export default YouTubeVideoPlayer;
