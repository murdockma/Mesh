import React, { useState } from 'react';
import { Hash, ChevronDown, Plus } from 'lucide-react';
import { useChatStore } from '@/lib/store/chat-store';
import { Channel, User } from '@/types/chat';

interface ChatSidebarProps {
  className?: string;
}

export function ChatSidebar({ className }: ChatSidebarProps) {
  const [showChannels, setShowChannels] = useState(true);
  const [showDirectMessages, setShowDirectMessages] = useState(true);

  const channels = useChatStore((state) => state.channels ?? []);
  const users = useChatStore((state) => state.users ?? []);
  const currentChannel = useChatStore((state) => state.currentChannel);
  const setCurrentChannel = useChatStore((state) => state.setCurrentChannel);

  console.log('ChatSidebar State:', {
    channels,
    users,
    currentChannel,
    showChannels,
    showDirectMessages
  });

  const onlineUsers = users.filter(
    (user) => user.status === 'online' || user.status === 'in-meeting'
  );

  return (
    <div className="w-64 bg-slate-800 border-r border-slate-700 p-4">
      <div className="flex-1 overflow-y-auto space-y-6">
        {/* Channels Section */}
        <div>
          <button
            onClick={() => setShowChannels(!showChannels)}
            className="flex items-center justify-between w-full text-slate-300 hover:text-white mb-2"
          >
            <div className="flex items-center gap-1">
              <ChevronDown
                className={`h-4 w-4 transform ${showChannels ? '' : '-rotate-90'}`}
              />
              <span className="text-sm font-medium">Channels</span>
            </div>
            <Plus className="h-4 w-4" />
          </button>

          {showChannels && channels && channels.length > 0 && (
            <div className="space-y-1">
              {channels.map((channel) => (
                <ChannelItem
                  key={channel.id}
                  channel={channel}
                  isActive={channel.id === currentChannel}
                  onClick={() => {
                    console.log('Clicking channel:', channel.id);
                    setCurrentChannel(channel.id);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Direct Messages Section */}
        <div>
          <button
            onClick={() => setShowDirectMessages(!showDirectMessages)}
            className="flex items-center justify-between w-full text-slate-300 hover:text-white mb-2"
          >
            <div className="flex items-center gap-1">
              <ChevronDown
                className={`h-4 w-4 transform ${
                  showDirectMessages ? '' : '-rotate-90'
                }`}
              />
              <span className="text-sm font-medium">Direct Messages</span>
            </div>
            <Plus className="h-4 w-4" />
          </button>

          {showDirectMessages && onlineUsers && onlineUsers.length > 0 && (
            <div className="space-y-1">
              {onlineUsers.map((user) => (
                <UserItem key={user.id} user={user} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChannelItem({
  channel,
  isActive,
  onClick,
}: {
  channel: Channel;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-2 py-1 rounded-lg text-sm ${
        isActive
          ? 'bg-indigo-600 text-white'
          : 'text-slate-300 hover:bg-slate-700/50'
      }`}
    >
      <div className="flex items-center gap-2">
        <Hash className="h-4 w-4" />
        <span>{channel.name}</span>
      </div>
      {(channel.unreadCount > 0 || channel.mentionsCount > 0) && (
        <div className="flex items-center gap-2">
          {channel.mentionsCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-1.5 rounded-full">
              {channel.mentionsCount}
            </span>
          )}
          {channel.unreadCount > 0 && (
            <span className="bg-slate-600 text-white text-xs px-1.5 rounded-full">
              {channel.unreadCount}
            </span>
          )}
        </div>
      )}
    </button>
  );
}

function UserItem({ user }: { user: User }) {
  return (
    <button className="w-full flex items-center justify-between px-2 py-1 rounded-lg text-sm text-slate-300 hover:bg-slate-700/50">
      <div className="flex items-center gap-2">
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-6 h-6 rounded-full"
          />
          <div
            className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-800 ${
              user.status === 'online'
                ? 'bg-green-500'
                : user.status === 'away'
                ? 'bg-yellow-500'
                : user.status === 'in-meeting'
                ? 'bg-purple-500'
                : 'bg-slate-500'
            }`}
          />
        </div>
        <span>{user.name}</span>
      </div>
      <span className="text-xs text-slate-500">{user.timezone}</span>
    </button>
  );
}
