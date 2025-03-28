
import { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, VolumeX, Volume2, Pause, Play } from 'lucide-react';
import { Video } from '../contexts/VideoContext';
import { useVideo } from '../contexts/VideoContext';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  video: Video;
  isActive: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, isActive }) => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { likeVideo, shareVideo } = useVideo();

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        if (playing) {
          videoRef.current.play().catch(error => {
            console.error("Video play failed:", error);
          });
        } else {
          videoRef.current.pause();
        }
      } else {
        videoRef.current.pause();
        setPlaying(false);
      }
    }
  }, [isActive, playing]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  const togglePlay = () => {
    setPlaying(!playing);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const handleLike = () => {
    if (!liked) {
      likeVideo(video.id);
      setLiked(true);
    }
  };

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="relative h-full w-full bg-black">
      {/* Video */}
      <div className="video-container relative h-full w-full" onClick={togglePlay}>
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          loop
          playsInline
          src={video.videoUrl}
        />
        
        {/* Play/Pause overlay */}
        <div className={cn("absolute inset-0 flex items-center justify-center transition-opacity", {
          "opacity-0": playing, 
          "opacity-100": !playing
        })}>
          {!playing && <Play className="h-20 w-20 text-white/80" />}
        </div>

        {/* Video controls */}
        <div className="video-controls absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 text-white">
            <button onClick={togglePlay} className="p-2">
              {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </button>
            <button onClick={toggleMute} className="p-2">
              {muted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Video info overlay */}
      <div className="absolute bottom-20 left-4 max-w-[80%] text-white">
        <h3 className="font-semibold">@{video.username}</h3>
        <p className="text-sm mt-2">{video.description}</p>
        <p className="text-xs mt-2 flex items-center">
          <span className="mr-2">♫</span>
          {video.audioTitle}
        </p>
      </div>

      {/* Right side actions */}
      <div className="absolute right-4 bottom-28 flex flex-col items-center space-y-6">
        <div className="flex flex-col items-center">
          <button
            className="p-2 rounded-full"
            onClick={handleLike}
          >
            <Heart
              className={cn("h-8 w-8", {
                "text-white": !liked,
                "text-secondary fill-secondary": liked
              })}
            />
          </button>
          <span className="text-white text-xs mt-1">{formatCount(video.likes)}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <button className="p-2 rounded-full">
            <MessageCircle className="h-8 w-8 text-white" />
          </button>
          <span className="text-white text-xs mt-1">{formatCount(video.comments.length)}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <button
            className="p-2 rounded-full"
            onClick={() => shareVideo(video.id)}
          >
            <Share2 className="h-8 w-8 text-white" />
          </button>
          <span className="text-white text-xs mt-1">{formatCount(video.shares)}</span>
        </div>
        
        <div>
          <div className="h-12 w-12 rounded-full border-2 border-white overflow-hidden">
            <img
              src={video.userAvatar}
              alt={video.username}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
