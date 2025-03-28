
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import BottomNavbar from '@/components/BottomNavbar';

const TRENDING_HASHTAGS = [
  { id: 1, name: 'dance', count: '12.4B' },
  { id: 2, name: 'fyp', count: '10.9B' },
  { id: 3, name: 'viral', count: '9.2B' },
  { id: 4, name: 'comedy', count: '7.8B' },
  { id: 5, name: 'music', count: '6.5B' },
  { id: 6, name: 'trending', count: '5.3B' },
];

const TRENDING_SOUNDS = [
  { id: 1, name: 'Original Sound - DJ Summer', count: '124K videos' },
  { id: 2, name: 'Levitating - Dua Lipa', count: '98K videos' },
  { id: 3, name: 'STAY - The Kid LAROI, Justin Bieber', count: '87K videos' },
  { id: 4, name: 'INDUSTRY BABY - Lil Nas X', count: '76K videos' },
];

const DiscoverPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-black text-white pb-16">
      <div className="sticky top-0 z-10 px-4 pt-4 pb-2 bg-black">
        <div className="relative">
          <Input
            className="bg-gray-800 border-none pl-10 text-white"
            placeholder="Search videos, sounds, or users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Trending Hashtags</h2>
        <div className="grid grid-cols-2 gap-3">
          {TRENDING_HASHTAGS.map((tag) => (
            <div
              key={tag.id}
              className="bg-gray-800 rounded-lg p-3 flex items-center justify-between"
            >
              <div>
                <span className="text-primary">#</span>
                <span>{tag.name}</span>
              </div>
              <span className="text-sm text-gray-400">{tag.count}</span>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold mt-8 mb-4">Popular Sounds</h2>
        <div className="space-y-3">
          {TRENDING_SOUNDS.map((sound) => (
            <div
              key={sound.id}
              className="bg-gray-800 rounded-lg p-4 flex items-center"
            >
              <div className="h-12 w-12 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium">{sound.name}</p>
                <p className="text-sm text-gray-400">{sound.count}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavbar />
    </div>
  );
};

export default DiscoverPage;
