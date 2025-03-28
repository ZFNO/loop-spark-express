
import { Home, Search, Plus, MessageSquare, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const BottomNavbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-black/95 flex items-center justify-around border-t border-gray-800 z-50">
      <Link
        to="/"
        className={cn("flex flex-col items-center justify-center w-1/5", {
          "text-white": isActive('/'),
          "text-gray-500": !isActive('/')
        })}
      >
        <Home className="h-6 w-6" />
        <span className="text-xs mt-1">Home</span>
      </Link>
      
      <Link
        to="/discover"
        className={cn("flex flex-col items-center justify-center w-1/5", {
          "text-white": isActive('/discover'),
          "text-gray-500": !isActive('/discover')
        })}
      >
        <Search className="h-6 w-6" />
        <span className="text-xs mt-1">Discover</span>
      </Link>
      
      <Link
        to="/upload"
        className="flex flex-col items-center justify-center w-1/5"
      >
        <div className="flex items-center justify-center h-10 w-14 rounded-md bg-gradient-to-r from-tiktok-teal to-tiktok-red">
          <Plus className="h-5 w-5 text-white" />
        </div>
      </Link>
      
      <Link
        to="/inbox"
        className={cn("flex flex-col items-center justify-center w-1/5", {
          "text-white": isActive('/inbox'),
          "text-gray-500": !isActive('/inbox')
        })}
      >
        <MessageSquare className="h-6 w-6" />
        <span className="text-xs mt-1">Inbox</span>
      </Link>
      
      <Link
        to="/profile"
        className={cn("flex flex-col items-center justify-center w-1/5", {
          "text-white": isActive('/profile'),
          "text-gray-500": !isActive('/profile')
        })}
      >
        <User className="h-6 w-6" />
        <span className="text-xs mt-1">Profile</span>
      </Link>
    </div>
  );
};

export default BottomNavbar;
