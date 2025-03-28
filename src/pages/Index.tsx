
import VideoFeed from '@/components/VideoFeed';
import TopNavbar from '@/components/TopNavbar';
import BottomNavbar from '@/components/BottomNavbar';

const Index = () => {
  return (
    <div className="h-screen bg-black text-white">
      <TopNavbar />
      <div className="h-full pt-14 pb-16">
        <VideoFeed />
      </div>
      <BottomNavbar />
    </div>
  );
};

export default Index;
