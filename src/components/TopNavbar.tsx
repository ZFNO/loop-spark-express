
import { useState } from 'react';
import { Link } from 'react-router-dom';

const TopNavbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('for-you');

  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-black/95 flex items-center justify-center z-50">
      <div className="flex space-x-6">
        <button
          className={`px-4 py-2 ${activeTab === 'following' ? 'text-white font-semibold' : 'text-gray-500'}`}
          onClick={() => setActiveTab('following')}
        >
          Following
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'for-you' ? 'text-white font-semibold' : 'text-gray-500'}`}
          onClick={() => setActiveTab('for-you')}
        >
          For You
        </button>
      </div>
      <div className="absolute top-3 right-4">
        <Link to="/search">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default TopNavbar;
