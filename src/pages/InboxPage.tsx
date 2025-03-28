
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BottomNavbar from '@/components/BottomNavbar';

const messages = [
  {
    id: 'm1',
    sender: 'TikTok',
    avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=48&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODI1MTg4NQ&ixlib=rb-4.0.3&q=80&w=48',
    message: 'Welcome to TikTok! Start creating...',
    time: '2h ago',
    unread: true,
  },
  {
    id: 'm2',
    sender: 'creator123',
    avatar: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=48&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODI1MTc5NA&ixlib=rb-4.0.3&q=80&w=48',
    message: 'Thanks for following! Check out my...',
    time: '1d ago',
    unread: false,
  },
];

const notifications = [
  {
    id: 'n1',
    type: 'like',
    user: 'user456',
    avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=48&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODI1MTg4NQ&ixlib=rb-4.0.3&q=80&w=48',
    content: 'liked your video',
    time: '3h ago',
  },
  {
    id: 'n2',
    type: 'follow',
    user: 'new_follower',
    avatar: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=48&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODI1MTg4NQ&ixlib=rb-4.0.3&q=80&w=48',
    content: 'started following you',
    time: '1d ago',
  },
  {
    id: 'n3',
    type: 'comment',
    user: 'commenter',
    avatar: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=48&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODI1MTg4NQ&ixlib=rb-4.0.3&q=80&w=48',
    content: 'commented: "Amazing video!"',
    time: '2d ago',
  },
];

const InboxPage = () => {
  const [activeTab, setActiveTab] = useState('notifications');

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-10 pb-16">
        <h1 className="text-xl font-bold px-4 mb-4">Inbox</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-gray-900 flex h-12 p-1 rounded-none">
            <TabsTrigger
              value="notifications"
              className="flex-1 data-[state=active]:bg-gray-800 rounded-none data-[state=active]:shadow-none"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="flex-1 data-[state=active]:bg-gray-800 rounded-none data-[state=active]:shadow-none"
            >
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="mt-0">
            <div className="divide-y divide-gray-800">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center p-4 hover:bg-gray-900"
                >
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
                    <img
                      src={notification.avatar}
                      alt={notification.user}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <p className="font-semibold">@{notification.user}</p>
                      <span className="ml-2 text-xs text-gray-400">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">
                      {notification.content}
                    </p>
                  </div>
                  {notification.type === 'follow' && (
                    <button className="px-4 py-1.5 bg-secondary text-white text-sm rounded-md">
                      Follow
                    </button>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="mt-0">
            <div className="divide-y divide-gray-800">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="flex items-center p-4 hover:bg-gray-900"
                >
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                    <img
                      src={message.avatar}
                      alt={message.sender}
                      className="h-full w-full object-cover"
                    />
                    {message.unread && (
                      <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-secondary"></span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <p className="font-semibold">@{message.sender}</p>
                      <span className="ml-2 text-xs text-gray-400">
                        {message.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 truncate">
                      {message.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavbar />
    </div>
  );
};

export default InboxPage;
