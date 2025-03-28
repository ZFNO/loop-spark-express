
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
  likes: number;
}

export interface Video {
  id: string;
  username: string;
  userAvatar: string;
  description: string;
  audioTitle: string;
  videoUrl: string;
  likes: number;
  comments: Comment[];
  shares: number;
  timestamp: string;
}

interface VideoContextType {
  videos: Video[];
  currentVideoIndex: number;
  setCurrentVideoIndex: (index: number) => void;
  likeVideo: (videoId: string) => void;
  addComment: (videoId: string, comment: string) => void;
  shareVideo: (videoId: string) => void;
  uploadVideo: (videoData: Omit<Video, 'id' | 'comments' | 'likes' | 'shares' | 'timestamp'>) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

// Sample video data
const initialVideos: Video[] = [
  {
    id: '1',
    username: 'tech_explorer',
    userAvatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=48&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODI1MTM3OA&ixlib=rb-4.0.3&q=80&w=48',
    description: 'Check out this new tech! #innovation #tech',
    audioTitle: 'Original Sound - tech_explorer',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-happily-in-a-field-of-tall-grass-49158-large.mp4',
    likes: 1245,
    comments: [
      { id: 'c1', username: 'user1', text: 'Amazing video!', timestamp: '2h ago', likes: 5 },
      { id: 'c2', username: 'user2', text: 'I need this in my life', timestamp: '1h ago', likes: 3 }
    ],
    shares: 76,
    timestamp: '2h ago'
  },
  {
    id: '2',
    username: 'travel_dreamer',
    userAvatar: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=48&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODI1MTc5NA&ixlib=rb-4.0.3&q=80&w=48',
    description: 'Paradise found 🌴 #travel #vacation',
    audioTitle: 'Vacation Vibes - DJ Summer',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-walking-under-a-skylight-4204-large.mp4',
    likes: 8732,
    comments: [
      { id: 'c3', username: 'user3', text: 'Where is this?', timestamp: '5h ago', likes: 12 },
      { id: 'c4', username: 'user4', text: 'Bucket list destination!', timestamp: '4h ago', likes: 8 }
    ],
    shares: 432,
    timestamp: '5h ago'
  },
  {
    id: '3',
    username: 'food_lover',
    userAvatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=48&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODI1MTg4NQ&ixlib=rb-4.0.3&q=80&w=48',
    description: 'Homemade pasta recipe! #foodie #recipe',
    audioTitle: 'Cooking Time - chef_music',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
    likes: 3498,
    comments: [
      { id: 'c5', username: 'user5', text: 'Looks delicious!', timestamp: '1d ago', likes: 45 },
      { id: 'c6', username: 'user6', text: 'I tried this recipe!', timestamp: '10h ago', likes: 22 }
    ],
    shares: 211,
    timestamp: '1d ago'
  }
];

export const VideoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const likeVideo = (videoId: string) => {
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId ? { ...video, likes: video.likes + 1 } : video
      )
    );
  };

  const addComment = (videoId: string, comment: string) => {
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId
          ? {
              ...video,
              comments: [
                ...video.comments,
                {
                  id: `c${Date.now()}`,
                  username: 'current_user',
                  text: comment,
                  timestamp: 'Just now',
                  likes: 0
                }
              ]
            }
          : video
      )
    );
  };

  const shareVideo = (videoId: string) => {
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId ? { ...video, shares: video.shares + 1 } : video
      )
    );
  };

  const uploadVideo = (videoData: Omit<Video, 'id' | 'comments' | 'likes' | 'shares' | 'timestamp'>) => {
    const newVideo: Video = {
      ...videoData,
      id: `v${Date.now()}`,
      comments: [],
      likes: 0,
      shares: 0,
      timestamp: 'Just now'
    };
    
    setVideos(prevVideos => [newVideo, ...prevVideos]);
  };

  return (
    <VideoContext.Provider
      value={{
        videos,
        currentVideoIndex,
        setCurrentVideoIndex,
        likeVideo,
        addComment,
        shareVideo,
        uploadVideo
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};
