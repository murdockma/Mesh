import React, { useState, useEffect, useCallback } from 'react';
import { ChatSidebar } from './ChatSidebar';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { useChatStore } from '@/lib/store/chat-store';

export function Chat() {
  const [searchQuery, setSearchQuery] = useState('');
  const currentChannel = useChatStore(state => state.currentChannel);
  const markChannelAsRead = useChatStore(state => state.markChannelAsRead);

  console.log('Chat Component - Current Channel:', currentChannel);

  // Mark channel as read when it changes
  useEffect(() => {
    if (currentChannel) {
      markChannelAsRead(currentChannel);
    }
  }, [currentChannel, markChannelAsRead]);

  return (
    <div className="flex h-full">
      <ChatSidebar />
      <div className="flex-1 flex flex-col">
        {currentChannel ? (
          <>
            <ChatHeader
              searchQuery={searchQuery}
              onSearch={setSearchQuery}
            />
            <MessageList />
            <MessageInput />
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            Select a channel to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
