
import { useRef, useState, useEffect } from 'react';
import { useVideo } from '../contexts/VideoContext';
import VideoPlayer from './VideoPlayer';

const VideoFeed: React.FC = () => {
  const { videos, currentVideoIndex, setCurrentVideoIndex } = useVideo();
  const feedRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (feedRef.current) {
        const container = feedRef.current;
        const scrollTop = container.scrollTop;
        const itemHeight = container.clientHeight;
        const index = Math.round(scrollTop / itemHeight);
        
        if (index !== currentVideoIndex) {
          setCurrentVideoIndex(index);
        }
      }
    };

    const feedElement = feedRef.current;
    if (feedElement) {
      feedElement.addEventListener('scroll', handleScroll);
      return () => {
        feedElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [currentVideoIndex, setCurrentVideoIndex]);

  // Handle swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSwipeDown = distance < -50;
    const isSwipeUp = distance > 50;
    
    if (isSwipeUp && currentVideoIndex < videos.length - 1) {
      navigateToVideo(currentVideoIndex + 1);
    } else if (isSwipeDown && currentVideoIndex > 0) {
      navigateToVideo(currentVideoIndex - 1);
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const navigateToVideo = (index: number) => {
    if (feedRef.current) {
      feedRef.current.scrollTo({
        top: index * feedRef.current.clientHeight,
        behavior: 'smooth'
      });
      setCurrentVideoIndex(index);
    }
  };

  return (
    <div 
      ref={feedRef}
      className="h-full w-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {videos.map((video, index) => (
        <div 
          key={video.id} 
          className="h-full w-full snap-start snap-always"
        >
          <VideoPlayer 
            video={video} 
            isActive={index === currentVideoIndex} 
          />
        </div>
      ))}
    </div>
  );
};

export default VideoFeed;
