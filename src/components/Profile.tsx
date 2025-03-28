
import { useState } from 'react';
import { useVideo } from '../contexts/VideoContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, Edit, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Profile: React.FC = () => {
  const { videos } = useVideo();
  const [following, setFollowing] = useState(false);
  
  // Filter videos for current user (normally would filter by userId)
  const userVideos = videos.filter(() => true); // All videos are user's videos in this mock

  return (
    <div className="pb-20">
      {/* Profile header */}
      <div className="pt-16 px-4 pb-4 bg-black">
        <div className="flex flex-col items-center">
          <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white mb-4">
            <img
              src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=96&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODI1MTg4NQ&ixlib=rb-4.0.3&q=80&w=96"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          
          <h2 className="text-xl font-bold text-white">@username</h2>
          
          <div className="flex space-x-4 mt-4 mb-6">
            <div className="text-center">
              <p className="font-bold text-white">241</p>
              <p className="text-xs text-gray-400">Following</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-white">15.3K</p>
              <p className="text-xs text-gray-400">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-white">382K</p>
              <p className="text-xs text-gray-400">Likes</p>
            </div>
          </div>
          
          <div className="flex space-x-2 w-full">
            <Button
              variant="outline"
              className={following ? "bg-transparent border-gray-600 text-white flex-1" : "bg-secondary text-white border-none flex-1"}
              onClick={() => setFollowing(!following)}
            >
              {following ? "Following" : "Follow"}
            </Button>
            <Button variant="outline" className="bg-transparent border-gray-600 p-2">
              <Share2 className="h-5 w-5 text-white" />
            </Button>
            <Button variant="outline" className="bg-transparent border-gray-600 p-2">
              <Edit className="h-5 w-5 text-white" />
            </Button>
          </div>
          
          <p className="text-white text-sm mt-4 text-center">
            Digital creator | Content about tech & lifestyle
            <br />
            ✨ New videos every day ✨
          </p>
        </div>
      </div>
      
      {/* Videos tabs */}
      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="w-full bg-black border-b border-gray-800 rounded-none">
          <TabsTrigger value="videos" className="flex-1 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-secondary data-[state=active]:shadow-none">
            Videos
          </TabsTrigger>
          <TabsTrigger value="liked" className="flex-1 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-secondary data-[state=active]:shadow-none">
            <Lock className="h-4 w-4 mr-1" /> Liked
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="videos" className="p-0 mt-0">
          <div className="grid grid-cols-3 gap-1">
            {userVideos.map((video) => (
              <div key={video.id} className="aspect-[9/16] relative bg-gray-900">
                <video
                  src={video.videoUrl}
                  className="h-full w-full object-cover"
                  playsInline
                  muted
                />
                <div className="absolute bottom-2 left-2 flex items-center text-white text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {video.likes < 1000 ? video.likes : `${(video.likes / 1000).toFixed(1)}K`}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="liked" className="p-0 mt-0">
          <div className="flex flex-col items-center justify-center py-12 px-4 bg-black h-64">
            <Lock className="h-12 w-12 text-gray-500 mb-4" />
            <p className="text-gray-300 text-center">
              This user's liked videos are private
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
