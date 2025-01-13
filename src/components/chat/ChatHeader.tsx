import React from 'react';
import { Hash, Star, Video, Phone, Share2, Search } from 'lucide-react';
import { useChatStore } from '@/lib/store/chat-store';

interface ChatHeaderProps {
  className?: string;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export function ChatHeader({ className, onSearch, searchQuery }: ChatHeaderProps) {
  const currentChannel = useChatStore(state => state.currentChannel);
  const channels = useChatStore(state => state.channels);
  
  const channel = channels.find((c) => c.id === currentChannel);

  if (!channel) return null;

  return (
    <div className={`bg-slate-800 border-b border-slate-700 p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Hash className="h-5 w-5 text-slate-400" />
            <h2 className="text-lg font-semibold text-white">{channel.name}</h2>
          </div>
          <Star className="h-4 w-4 text-slate-400 hover:text-yellow-400 cursor-pointer" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-700 rounded-lg">
              <Video className="h-5 w-5 text-slate-400" />
            </button>
            <button className="p-2 hover:bg-slate-700 rounded-lg">
              <Phone className="h-5 w-5 text-slate-400" />
            </button>
            <button className="p-2 hover:bg-slate-700 rounded-lg">
              <Share2 className="h-5 w-5 text-slate-400" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search in channel..."
              className="w-64 bg-slate-700 text-slate-200 pl-10 pr-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
